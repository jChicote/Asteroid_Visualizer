import * as THREE from "../../../node_modules/three/build/three.module.js";
import { GameObject } from "../Entities/GameObject.js";

class Camera extends GameObject {
    InitialiseFields() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 6000);
    }

    SetPosition(newPosition) {
        this.camera.position.set(newPosition.x, newPosition.y, newPosition.z);
    }

    GetPosition() {
        return this.camera.position;
    }

    GetControlledCamera() {
        return this.camera;
    }
}

export { Camera };
