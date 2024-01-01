import { GameObject } from "../Entities/GameObject.js";

class Camera extends GameObject {
    constructor() {
        super();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 6000);
    }
}

export { Camera };
