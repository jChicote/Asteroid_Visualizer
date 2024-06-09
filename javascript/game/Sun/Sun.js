import * as THREE from "three";
import { CelestialObjectDelegate } from "../CelestialObjects/CelestialObjectDelegate.js";
import { CelestialObjectMarkerHandler } from "../Components/Handlers/CelestialObjectMarkerHandler.js";
import { EventMediator } from "../../user-interface/mediator/EventMediator.js";
import { GameManager } from "../GameManager.js";
import { GameObject } from "../Entities/GameObject.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { SunMaterialConfiguration } from "./SunMaterialConfiguration.js";

class Sun extends GameObject {
    InitialiseFields(paramters) {
        super.InitialiseFields(paramters);

        // Fields
        this.pointLight = this.CreateLightSource();
        this.renderedObject = "";
        this.objectType = "Star";
        this.classification = "Yellow-Giant";

        // Components
        this.materialRenderer = new MaterialRenderer(new SunMaterialConfiguration());
        this.renderedObject = this.CreateRenderedObject(this.GetRadius(), 0xFFFFFF, new THREE.Vector3(0, 0, 0));

        this.currentTime = performance.now() / 1000;
        this.lastTime = performance.now();
        this.deltaTime = 0.01;

        // Observers
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    Awake() {
        GameManager.gameObjectRegistry.RegisterGameObject("Sun", this.renderedObject);
    }

    Start() {
        this.sunDelegate = new CelestialObjectDelegate();
        this.sunDelegate.SetMarker = this.SetMarker.bind(this);
        this.sunDelegate.GetRenderedObject = this.GetRenderedObject.bind(this);
        this.sunDelegate.GetName = this.GetName.bind(this);
        this.sunDelegate.GetType = this.GetType.bind(this);

        this.controlledCamera = GameManager.gameObjectRegistry.GetGameObject("Camera");

        this.markerHandler = new CelestialObjectMarkerHandler({
            eventMediator: this.eventMediator,
            planetCode: "000fff",
            planetDelegate: this.sunDelegate,
            renderedObject: this.renderedObject
        });

        GameManager.gameObserver.Subscribe("OnResetToDefault", this.markerHandler.HideMarker.bind(this.markerHandler));
        GameManager.gameObserver.Subscribe("OnTargetSelected", this.markerHandler.ShowMarker.bind(this.markerHandler));

        // On default the sun is the preselected target.
        this.markerHandler.HideMarker();
    }

    Update() {
        this.markerHandler.UpdateMarker();

        if (SolarSystemVisualizer.gameManager.gameState.isPaused) return;

        this.currentTime += this.deltaTime;
        this.materialRenderer.material.uniforms.time.value = this.currentTime;

        this.RotateSun();
        this.RenderShaderDetail();
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    CreateRenderedObject(radius, hexColor, position) {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 48, 16),
            this.materialRenderer.GetMaterial()
        );

        mesh.gameObject = this;
        this.SetVector(mesh, position);
        GameManager.scene.add(mesh);

        return mesh;
    }

    GetRadius() {
        return 2;
    }

    CreateLightSource() {
        const pointLight = new THREE.PointLight(0xFFFFFF, 50000, 0);
        this.SetVector(pointLight, new THREE.Vector3(0, 0, 0));

        GameManager.scene.add(pointLight);

        return pointLight;
    }

    GetName() {
        return "Sun";
    }

    GetType() {
        return this.objectType;
    }

    GetRenderedObject() {
        return this.renderedObject;
    }

    // This method is just a passthrough
    SetMarker(marker) {
        this.marker = this.markerHandler.SetMarker(marker);
    }

    RotateSun() {
        this.renderedObject.rotation.y += 0.00005 * 27;
    }

    RenderShaderDetail() {
        const distanceToCamera = this.renderedObject.position.distanceTo(this.controlledCamera.GetPosition());
        this.renderedObject.material.uniforms.isDetailed.value = distanceToCamera < 50;
    }
}

export { Sun };
