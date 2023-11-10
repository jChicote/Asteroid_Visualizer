import { OrbitControls } from "../../addons/OrbitControls.js";
import * as THREE from "../../node_modules/three/build/three.module.js";
import { StarCreator } from "../star-creator.js";
import { DataLoaderProvider } from "./Infrastructure/DataLoaders/DataLoaderProvider.js";
import { PlanetManager } from "./Planets/PlanetManager.js";

export class GameManager {
    static scene;

    constructor(serviceProvider) {
        this.camera = "";
        this.renderer = "";
        this.controls = "";

        if (this.scene == null) {
            this.scene = new THREE.Scene();
        }

        this.dataLoaderProvider = new DataLoaderProvider(serviceProvider);
        this.planetManager = new PlanetManager(serviceProvider, this.scene);
    }

    async Initialise() {
        // Initialise data
        const planetDataLoader = await this.dataLoaderProvider.CreateDataLoader("Planets");
        await planetDataLoader.LoadAsync();
    }

    Start() {
        this.SetupScene();
        this.planetManager.SetupPlanets();

        // TODO: Move this to its own section
        const starCreator = new StarCreator(this.scene);
        starCreator.CreateStar(5, 0xFFFFFF, new THREE.Vector3(0, 0, 0));
    }

    Update() {
        // Update Controls
        this.controls.update();

        // Update Planets
        this.planetManager.UpdatePlanets();

        this.renderer.render(this.scene, this.camera);
    }

    SetupScene() {
        // Setup camera + rendering
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 4000);
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("canvas-container").appendChild(this.renderer.domElement);

        this.camera.position.set(0, 20, 100);

        // Setup controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.update();
    }
}
