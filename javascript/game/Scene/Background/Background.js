import * as THREE from "../../../../node_modules/three/build/three.module.js";
// import { MaterialRenderer } from "../../Components/Visual/MaterialRenderer.js";
import { GameObject } from "../../Entities/GameObject.js";

class Background extends GameObject {
    constructor(scene, materialConfigurationProvider) {
        super();

        // Fields
        this.scene = scene;
        this.materialConfiguration = materialConfigurationProvider.GetMaterialConfiguration("Background_MilkyWay");
        this.materialRenderer = {};

        this.backgroundSphere = {};
    }

    Start() {
        // const sphereGeometry = new THREE.SphereGeometry(100, 60, 40);

        // this.materialRenderer = new MaterialRenderer(this.materialConfiguration);
        // this.backgroundSphere = new THREE.Mesh(sphereGeometry, this.materialRenderer.GetMaterial());
        // this.backgroundSphere.side = THREE.DoubleSide;
        // this.backgroundSphere.scale.x = -1;
        // this.scene.add(this.backgroundSphere);

        const loader = new THREE.TextureLoader();
        const textureEquirec = loader.load("../../../../images/Backgrounds/milky-way-panorama.jpg");
        textureEquirec.encoding = THREE.sRGBEncoding;
        textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.background = textureEquirec;
    }
}

export { Background };
