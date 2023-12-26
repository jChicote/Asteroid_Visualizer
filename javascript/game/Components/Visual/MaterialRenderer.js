import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";

export class MaterialRenderer {
    constructor(planetCode) {
        this.material = new THREE.MeshBasicMaterial({ color: DefaultPlanetColor.GetColorByIdentifier(planetCode) }); // TODO: Subclass this into its own material
    }

    LoadMaterialFromShader(fragmentUrl, vertexUrl, uniforms, onComplete = null, onError = null) {
        try {
            const fragmentShaderLoader = new THREE.FileLoader(THREE.DefaultLoadingManager);
            const vertexShaderLoader = new THREE.FileLoader(THREE.DefaultLoadingManager);

            fragmentShaderLoader.load(fragmentUrl, (fragmentShader) => {
                vertexShaderLoader.load(vertexUrl, (vertexShader) => {
                    this.material = new THREE.ShaderMaterial({
                        uniforms,
                        vertexShader,
                        fragmentShader
                    });

                    if (onComplete) onComplete(this.material);
                }, null, () => {
                    if (onError) onError("Vertex shader cannot be loaded on path: " + vertexUrl);
                });
            }, null, () => {
                if (onError) onError("Fragment shader cannot be loaded on path: " + fragmentUrl);
            });
        } catch (e) {
            console.log(e);
        }

        return this.material;
    }

    GetMaterial() {
        return this.material;
    }
}
