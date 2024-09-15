import * as THREE from "three";
import { GameObject } from "../../Entities/GameObject.js";
import { GameManager } from "../../GameManager.js";

class CameraLight extends GameObject {
    constructor(camera) {
        super({ camera });
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        // Fields
        this.camera = parameters.camera;
        this.light = new THREE.PointLight(0xffffff, 50, 100);
        this.isLightEnabled = false;

        // Attach to the camera
        parameters.camera.add(this.light);
        GameManager.scene.add(this.light);
    }

    Awake() {
        GameManager.gameObserver.Subscribe("ToggleCameraLight", this.ToggleCameraLight.bind(this));
        GameManager.gameObserver.Subscribe("SetCameraLightIntensity", this.SetLightIntensity.bind(this));
    }

    Update() {
        this.light.position.copy(this.camera.position);
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    ToggleCameraLight() {
        if (this.isLightEnabled) {
            this.DisableLight();
            this.isLightEnabled = false;
        } else {
            this.EnableLight();
            this.isLightEnabled = true;
        }
    }

    EnableLight() {
        this.light.visible = true;
    }

    DisableLight() {
        this.light.visible = false;
    }

    SetLightIntensity(intensity) {
        this.light.intensity = intensity;
    }
}

export { CameraLight };
