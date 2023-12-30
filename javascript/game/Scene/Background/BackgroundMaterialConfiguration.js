import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { MaterialConfiguration } from "../../Base/MaterialConfiguration.js";
import { ShaderConfiguration } from "../../Base/ShaderConfiguration.js";

class BackgroundMaterialConfiguration extends MaterialConfiguration {
    constructor() {
        super();

        const loader = new THREE.TextureLoader();
        this.texture = loader.load("../../../../images/Backgrounds/milky-way-panorama.jpg");

        this.key = "Background_MilkyWay"; // Knowing that there will be one instance of the object a simpler key is used.
        this.defaultMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        this.shaderConfiguration = new ShaderConfiguration(
            this.key,
            "../../../../Shaders/Background/Background.fragment.glsl",
            "../../../../Shaders/Background/Background.vertex.glsl",
            {
                texture: { value: this.texture },
                brightness: { value: 0.5 } // Adjust this value for brightness
            }
        );
    }
}

export { BackgroundMaterialConfiguration };
