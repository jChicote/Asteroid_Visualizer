import * as THREE from "three";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { MarkerState } from "../../user-interface/hover-markers/CelestialHoverMarker.jsx";
import { EventMediator } from "../../user-interface/mediator/EventMediator.js";
import { ObjectValidator } from "../../utils/ObjectValidator.js";
import { MathHelper } from "../../utils/math-library.js";
import { CelestialOrbitalMotionLogic } from "../Components/OrbitalMechanics/CelestialOrbitalMotionLogic.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { GameObject } from "../Entities/GameObject.js";
import { GameManager } from "../GameManager.js";

export class Planet extends GameObject {
    constructor(planetCode, planetData, materialConfigurationProvider) {
        super({ planetCode, planetData, materialConfigurationProvider });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        // Fields
        this.materialConfiguration = parameters.materialConfigurationProvider.GetMaterialConfiguration(parameters.planetCode);
        this.meanMotion = "";
        this.orbitalPeriod = "";
        this.planetCode = parameters.planetCode;
        this.planetData = parameters.planetData;
        this.renderedObject = "";
        this.timeStep = "";
        this.hasRing = false;
        this.ring = null;

        this.identifier = parameters.planetCode;
        this.objectType = "Planet";
        this.classification = "None";

        // Components
        this.materialRenderer = {};
        this.orbitalMotion = new CelestialOrbitalMotionLogic();
        this.planetState = new PlanetState(parameters.planetData.meanAnomaly, 0);

        // Observers
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    Start() {
        this.materialRenderer = new MaterialRenderer(this.materialConfiguration);

        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(this.planetData.semiMajorAxis);
        this.meanMotion = MathHelper.ConvertDegreesToRadians(this.planetData.meanMotion);
        this.timeStep = this.orbitalMotion.CalculateTimeStep(this.orbitalPeriod);
        this.renderedObject = this.RenderPlanet();

        this.planetDelegate = new PlanetDelegate();
        this.planetDelegate.SetMarker = this.SetMarker.bind(this);
        this.planetDelegate.GetRenderedObject = this.GetRenderedObject.bind(this);
        this.planetDelegate.GetName = this.GetName.bind(this);

        // Note: This implementation will only work with saturn.
        if (ObjectValidator.IsValid(this.materialConfiguration.ringConfiguration)) {
            console.log("Planet with rings found");
            this.AddRings();
        }

        this.eventMediator.Notify("CreateHoverMarker", {
            id: this.planetCode,
            position: {
                x: this.renderedObject.position.x,
                y: this.renderedObject.position.y,
                z: this.renderedObject.position.z
            },
            delegate: this.planetDelegate
        });

        // this.visualiserDebugger = new VisibilityDebugger();
    }

    // Updates the planet. Used during runtime.
    Update() {
        // this.visualiserDebugger.Update();
        if (ObjectValidator.IsValid(this.marker)) {
            // TODO: Refactor this out into a seperate service or method passing in the MarkerState. Preferably into a component
            // Determine if the planet is behind the camera
            const camera = GameManager.gameObjectRegistry.GetGameObject("Camera");
            const directionToObject = this.renderedObject.position.clone().sub(camera.GetPosition()).normalize();
            const dotProduct = camera.GetWorldDirection().dot(directionToObject);

            if (dotProduct < 0) {
                this.marker.SetState(MarkerState.Hidden);
            } else {
                this.marker.UpdateMarker();
            }

            this.marker.UpdatePosition({
                x: this.renderedObject.position.x,
                y: this.renderedObject.position.y,
                z: this.renderedObject.position.z
            });
        }

        if (SolarSystemVisualizer.gameManager.gameState.isPaused) {
            return;
        }

        this.UpdateOrbitalState();
        this.SetPlanetPosition(this.renderedObject);
        this.RotatePlanet();

        // Note: This implementation will only work with saturn.
        if (ObjectValidator.IsValid(this.ring)) {
            this.ring.position.copy(this.renderedObject.position);
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    RenderPlanet() {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(this.GetRadius(), 32, 16),
            this.materialRenderer.GetMaterial());

        mesh.gameObject = this;
        this.SetPlanetPosition(mesh);
        GameManager.scene.add(mesh);

        return mesh;
    }

    RotatePlanet() {
        this.renderedObject.rotation.y += this.orbitalMotion.GetAngularVelocity(this.planetData.sideRealDayPeriod) * this.timeStep;
    }

    SetPlanetPosition(planet) {
        const position = this.orbitalMotion.CalculateOrbitalPosition(
            MathHelper.ConvertKilometersToAstronomicalUnits(this.planetData.semiMajorAxis),
            this.planetData.eccentricity,
            MathHelper.ConvertDegreesToRadians(this.planetData.inclination) * -1,
            MathHelper.ConvertDegreesToRadians(this.planetData.longitudeOfAscendingNode) * -1,
            MathHelper.ConvertDegreesToRadians(this.planetData.argumentOfPerihelion) * -1,
            this.planetState.meanAnomaly,
            100);

        this.SetVector(planet, position);
    }

    GetState() {
        return this.planetState;
    }

    GetData() {
        return this.planetData;
    }

    GetCodeIdentifier() {
        return this.planetCode;
    }

    GetName() {
        return this.planetData.name;
    }

    GetRadius() {
        return this.planetData.planetRadius * 0.0001; // TODO: ABstract this to make this dynamically scaled
    }

    GetRenderedObject() {
        return this.renderedObject;
    }

    // This method so far is intended for Saturn only.
    AddRings() {
        const ringGeometry = new THREE.RingGeometry(1.5 * 5, 2.5 * 5, 42);
        // Ring material will have to plane color as the material renderer will be changed to handle seperate methods of configuration.
        const ringMaterial = new THREE.MeshStandardMaterial({ color: 0x473e2e, side: THREE.DoubleSide });
        this.ring = new THREE.Mesh(ringGeometry, ringMaterial);
        this.ring.rotation.x = 90 * (Math.PI / 180); // Rotate ring by 90 degrees

        this.renderedObject.add(this.ring);
        GameManager.scene.add(this.ring);

        this.ring.position.copy(this.renderedObject.position);
    }

    UpdateOrbitalState() {
        this.planetState.currentTime += this.timeStep * SolarSystemVisualizer.gameManager.gameState.timeMultiplier;
        this.planetState.meanAnomaly = this.orbitalMotion.GetCurrentMeanAnomaly(
            this.planetData.meanAnomaly,
            this.meanMotion,
            this.planetState.currentTime);
    }

    SetMarker(marker) {
        this.marker = marker;
    }
}

class PlanetDelegate {
    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    SetMarker(marker) { }

    GetRenderedObject() { }

    GetName() {

    }
}

export { PlanetDelegate };

export class PlanetState {
    constructor(meanAnomaly, initialTime) {
        this.meanAnomaly = meanAnomaly;
        this.currentTime = initialTime;
    }
}
