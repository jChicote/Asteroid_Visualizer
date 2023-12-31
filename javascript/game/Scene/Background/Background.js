import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { GameObject } from "../../Entities/GameObject.js";

class Background extends GameObject {
    constructor(scene) {
        super();

        // Fields
        this.scene = scene;
    }

    Start() {
        const loader = new THREE.TextureLoader();
        const textureEquirec = loader.load("../../../../images/Backgrounds/milky-way-panorama.jpg");
        textureEquirec.colorSpace = THREE.SRGBColorSpace;
        textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.background = textureEquirec;
    }
}

export { Background };
