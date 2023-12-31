import * as THREE from "../../node_modules/three/build/three.module.js";
import { AsteroidManager } from "./Asteroids/AsteroidManager.js";
import { Background } from "./Scene/Background/Background.js";
import { CometManager } from "./Comets/CometManager.js";
import { DataLoaderProvider } from "./Infrastructure/DataLoaders/DataLoaderProvider.js";
import { GUI } from "../../node_modules/dat.gui/build/dat.gui.module.js";
import { GlobalState } from "./GlobalState.js";
import { OrbitControls } from "../../addons/OrbitControls.js";
import { PlanetManager } from "./Planets/PlanetManager.js";
import { ShaderManager } from "./Managers/ShaderManager/ShaderManager.js";
import { Sun } from "./Sun/Sun.js";
import { TimeControl } from "./Components/Time/TimeControl.js";
import { TextureManager } from './Managers/ShaderManager/TextureManager.js';

export class GameManager {
    static scene;
    static debugGui;

    constructor(serviceProvider) {
        // Fields
        this.camera = "";
        this.renderer = "";
        this.controls = "";
        this.sun = "";

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
        this.timeControl = new TimeControl(this.gameState, serviceProvider);
        this.shaderManager = new ShaderManager(serviceProvider);
        this.textureManager = new TextureManager(serviceProvider);
        this.background = new Background(this.scene);
    }

    async Initialise() {
        // const asteroidDataLoader = await this.dataLoaderProvider.CreateDataLoader("Asteroids");
        // await asteroidDataLoader.LoadAsync();

        // const cometsDataLoader = await this.dataLoaderProvider.CreateDataLoader("Comets");
        // await cometsDataLoader.LoadAsync();

        const planetDataLoader = await this.dataLoaderProvider.CreateDataLoader("Planets");
        await planetDataLoader.LoadAsync();
    }

    Start() {
        this.SetupScene();

        this.sun = new Sun();

        this.SetupDebugHelpers();
    }

    Update() {
        // Update Controls
        this.controls.update();

        // Update Planets
        this.planetManager.UpdatePlanets();
        this.asteroidManager.UpdateAsteroids();
        this.cometManager.UpdateComets();

        this.sun.Update();

        this.renderer.render(this.scene, this.camera);
    }

    SetupScene() {
        // Setup camera + rendering
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 6000);
        // this.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
        this.renderer = new THREE.WebGLRenderer();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("canvas-container").appendChild(this.renderer.domElement);

        this.camera.position.set(0, 20, 100);

        this.background.Start();

        // Setup controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.update();

        // Setup Debug GUI
        this.SetupDebugGUI();
    }

    SetupDebugHelpers() {
        const axesHelper = new THREE.AxesHelper(30);
        this.scene.add(axesHelper);
    }

    SetupDebugGUI() {
        const orbitalMechanicsFolder = this.debugGui.addFolder("Orbital Mechanics");
        orbitalMechanicsFolder.add(this.gameState, "timeMultiplier", -20, 20, 0.01);
        orbitalMechanicsFolder.add(this.gameState, "timeStepResolution", 1000, 100000, 100);
        orbitalMechanicsFolder.add(this.gameState, "isPaused").onChange(isPaused => {
            if (isPaused) {
                this.gameState.timeMultiplier = 0;
            } else {
                this.gameState.timeMultiplier = 1;
            }
        });

        const globalPhysicalProperties = this.debugGui.addFolder("Global Physical Properties");
        globalPhysicalProperties.add(this.gameState, "physicalRadiusMultiplier", 1, 25, 0.1);
        globalPhysicalProperties.add(this.gameState, "distanceToSunMultiplier", 1, 20, 0.1);
    }
}
