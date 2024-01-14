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

        // Attach to the camera
        parameters.camera.add(this.light);
        GameManager.scene.add(this.light);
    }

    Update() {
        this.light.position.copy(this.camera.position);
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

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
