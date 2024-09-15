import * as THREE from "three";
import { GameManager } from "../../GameManager.js";
import { GameObject } from "../../Entities/GameObject.js";
import backgroundTexture from "../../../textures/Backgrounds/milky-way-panorama-2.jpg";

class Background extends GameObject {
    Start() {
        const loader = new THREE.TextureLoader();
        const textureEquirec = loader.load(backgroundTexture);
        textureEquirec.colorSpace = THREE.SRGBColorSpace;
        textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
        GameManager.scene.background = textureEquirec;
    }
}

export { Background };
