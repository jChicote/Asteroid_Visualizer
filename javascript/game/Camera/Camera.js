import * as THREE from "three";
import { CameraContract } from "./CameraContract.js";
import { CameraLight } from "./Light/CameraLight.js";
import { GameObject } from "../Entities/GameObject.js";
import { GameManager } from "../GameManager.js";

class Camera extends GameObject {
    InitialiseFields() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 6000);
        this.cameraLight = new CameraLight(this.camera);
        this.cameraLight.DisableLight();

        this.SetPosition(new THREE.Vector3(30, 20, 45));
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    Start() {
        const gameObjectRegistry = GameManager.gameObjectRegistry;
        const cameraContract = new CameraContract();

        cameraContract.GetControlledCamera = this.GetControlledCamera.bind(this);
        cameraContract.SetAspectRatio = this.SetAspectRatio.bind(this);
        cameraContract.GetProjectionMatrix = this.GetProjectionMatrix.bind(this);
        cameraContract.GetMatrixWorldInverse = this.GetMatrixWorldInverse.bind(this);
        cameraContract.GetPosition = this.GetPosition.bind(this);
        cameraContract.GetQuaternion = this.GetQuaternion.bind(this);
        cameraContract.GetWorldPosition = this.GetWorldPosition.bind(this);
        cameraContract.GetWorldDirection = this.GetWorldDirection.bind(this);
        gameObjectRegistry.RegisterGameObject("Camera", cameraContract);
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    SetPosition(newPosition) {
        this.camera.position.copy(newPosition);
        return this.camera.position;
    }

    SetRotationFromVector(newRotation) {
        this.camera.rotation.setFromVector3(newRotation);
        return this.camera.rotation;
    }

    SetQuaternion(newQuaternion) {
        this.camera.quaternion.copy(newQuaternion);
        return this.camera.quaternion;
    }

    GetPosition() {
        return this.camera.position.clone();
    }

    GetProjectionMatrix() {
        this.camera.updateProjectionMatrix();
        return this.camera.projectionMatrix.clone();
    }

    GetMatrixWorldInverse() {
        return this.camera.matrixWorldInverse.clone();
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

    GetWorldPosition() {
        return this.camera.getWorldPosition(new THREE.Vector3());
    }

    GetWorldDirection() {
        return this.camera.getWorldDirection(new THREE.Vector3());
    }

    SetAspectRatio(newAspectRatio) {
        this.camera.aspect = newAspectRatio;
        this.camera.updateProjectionMatrix();
    }
}

export { Camera };
