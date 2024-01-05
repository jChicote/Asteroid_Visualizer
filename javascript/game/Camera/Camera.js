import * as THREE from "../../../node_modules/three/build/three.module.js";
import { GameObject } from "../Entities/GameObject.js";

class Camera extends GameObject {
    InitialiseFields() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.4, 6000);
        this.SetPosition(new THREE.Vector3(30, 20, 45));
    }

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
