import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { GameManager } from "../../GameManager.js";
import { GameObject } from "../../Entities/GameObject.js";

class Background extends GameObject {
    constructor(scene) {
        super();
    }

    Start() {
        const loader = new THREE.TextureLoader();
        const textureEquirec = loader.load("../../../../images/Backgrounds/milky-way-panorama-2.jpg");
        textureEquirec.colorSpace = THREE.SRGBColorSpace;
        textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
        GameManager.scene.background = textureEquirec;
    }
}

export { Background };
