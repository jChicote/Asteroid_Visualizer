import * as THREE from "three";
import { GameObject } from "../Entities/GameObject.js";
import { CameraLight } from "./Light/CameraLight.js";

class Camera extends GameObject {
    InitialiseFields() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.4, 6000);
        this.cameraLight = new CameraLight(this.camera);
        this.cameraLight.DisableLight();

        this.SetPosition(new THREE.Vector3(30, 20, 45));
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    SetPosition(newPosition) {
        this.camera.position.copy(newPosition);
        return this.camera.position;
    }

    SetQuaternion(newQuaternion) {
        this.camera.quaternion.copy(newQuaternion);
        return this.camera.quaternion;
    }

    GetPosition() {
        return this.camera.position.clone();
    }

    GetEulerRotation() {
        return this.camera.rotation.clone();
    }

    GetQuaternion() {
        return this.camera.quaternion.clone();
    }

    GetControlledCamera() {
        return this.camera;
    }
}

export { Camera };
