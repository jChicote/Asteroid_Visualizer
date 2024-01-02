import * as THREE from "../../../node_modules/three/build/three.module.js";
import { GameManager } from "../GameManager.js";
import { GameObject } from "../Entities/GameObject.js";

class CameraRaycaster extends GameObject {
    constructor(camera) {
        super({ camera });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);
        this.camera = parameters.camera;
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();

        window.addEventListener("pointermove", this.OnMouseMove.bind(this), false);
    }

    Update() {
        if (!this.enabled) {
            return;
        }

        this.RaycastFromPointer(this.pointer);
    }

    OnMouseMove(event) {
        console.log("Mouse move");
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    RaycastFromPointer(pointer) {
        this.raycaster.setFromCamera(pointer, this.camera.GetControlledCamera());
        const intersects = this.raycaster.intersectObjects(GameManager.scene.children);

        for (const element of intersects) {
            console.log(element);
        }
    }
}

export { CameraRaycaster };
