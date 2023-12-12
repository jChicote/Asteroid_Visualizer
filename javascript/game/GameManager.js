import { OrbitControls } from "../../addons/OrbitControls.js";
import { GUI } from "../../node_modules/dat.gui/build/dat.gui.module.js";
import * as THREE from "../../node_modules/three/build/three.module.js";
import { StarCreator } from "../star-creator.js";
import { AsteroidManager } from "./Asteroids/AsteroidManager.js";
import { CometManager } from "./Comets/CometManager.js";
import { GlobalState } from "./GlobalState.js";
import { DataLoaderProvider } from "./Infrastructure/DataLoaders/DataLoaderProvider.js";
import { PlanetManager } from "./Planets/PlanetManager.js";

export class GameManager {
    static scene;
    static debugGui;

    constructor(serviceProvider) {
        this.camera = "";
        this.renderer = "";
        this.controls = "";

        if (this.scene == null) {
            this.scene = new THREE.Scene();
        }

        if (this.debugGui == null) {
            this.debugGui = new GUI({ autoPlace: false });
            document.querySelector("#gui").append(this.debugGui.domElement);
        }

        // Components
        this.gameState = new GlobalState();
        this.dataLoaderProvider = new DataLoaderProvider(serviceProvider);
        this.planetManager = new PlanetManager(serviceProvider, this.scene);
        this.asteroidManager = new AsteroidManager(serviceProvider);
        this.cometManager = new CometManager(serviceProvider);
    }

    async Initialise() {
        // Initialise data
        const asteroidDataLoader = await this.dataLoaderProvider.CreateDataLoader("Asteroids");
        await asteroidDataLoader.LoadAsync();

        const cometsDataLoader = await this.dataLoaderProvider.CreateDataLoader("Comets");
        await cometsDataLoader.LoadAsync();

        const planetDataLoader = await this.dataLoaderProvider.CreateDataLoader("Planets");
        await planetDataLoader.LoadAsync();
    }

    Start() {
        this.SetupScene();

        // TODO: Move this to its own section
        const starCreator = new StarCreator(this.scene);
        starCreator.CreateStar(5, 0xFFFFFF, new THREE.Vector3(0, 0, 0));
    }

    Update() {
        // Update Controls
        this.controls.update();

        // Update Planets
        this.planetManager.UpdatePlanets();
        this.asteroidManager.UpdateAsteroids();
        this.cometManager.UpdateComets();

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

        // Setup Debug GUI
        this.SetupDebugGUI();
    }

    SetupDebugGUI() {
        const orbitalMechanicsFolder = this.debugGui.addFolder("Orbital Mechanics");
        orbitalMechanicsFolder.add(this.gameState, "timeMultiplier", 0, 30, 0.1);
        orbitalMechanicsFolder.add(this.gameState, "timeStepResolution", 1000, 100000, 100); // TODO: For this to work it will need to recalculate the orbital period.
        orbitalMechanicsFolder.add(this.gameState, "isPaused").onChange(isPaused => {
            if (isPaused) {
                this.gameState.timeMultiplier = 0;
            } else {
                this.gameState.timeMultiplier = 1;
            }
        });
    }
}
