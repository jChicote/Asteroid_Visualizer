import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { GameObject } from "../Entities/GameObject.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import * as THREE from "three";

class PostProcessingWorkflow extends GameObject {
    constructor(camera, renderer, scene) {
        super({ camera, renderer, scene });
    }

    // --------------------------------------------------------------------------
    //                            Lifecycle Methods
    // --------------------------------------------------------------------------

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        this.composer = new EffectComposer(parameters.renderer);

        const renderPass = new RenderPass(parameters.scene, parameters.camera);
        this.composer.addPass(renderPass);

        const unrealBloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.15,
            0.10,
            0.10
        );
        this.composer.addPass(unrealBloomPass);

        const smaaPass = new SMAAPass(new THREE.Vector2(window.innerWidth, window.innerHeight));
        this.composer.addPass(smaaPass);

        const outputPass = new OutputPass();
        this.composer.addPass(outputPass);
    }

    Update() {
        if (this.composer === undefined) { return; }

        this.composer.render();
    }
}

export { PostProcessingWorkflow };
