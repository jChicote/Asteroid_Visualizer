import * as THREE from "../../../node_modules/three/build/three.module.js";
import { GameObject } from "../Entities/GameObject.js";

class Camera extends GameObject {
    InitialiseFields() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 6000);
    }

    SetPosition(newPosition) {
        this.camera.position.copy(newPosition);
    }

    TrackPosition(targetPosition, viewPosition) {
        // this.camera.position.copy(viewPosition);
        // this.camera.lookAt(targetPosition);
    }

    GetPosition() {
        return this.camera.position.clone();
    }

    GetControlledCamera() {
        return this.camera;
    }
}

export { Camera };
