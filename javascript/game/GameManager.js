import * as THREE from "../../node_modules/three/build/three.module.js";
import { AsteroidManager } from "./Asteroids/AsteroidManager.js";
import { Background } from "./Scene/Background/Background.js";
import { Camera } from "./Camera/Camera.js";
import { CameraController } from "./Camera/CameraController.js";
import { CometManager } from "./Comets/CometManager.js";
import { DataLoaderProvider } from "./Infrastructure/DataLoaders/DataLoaderProvider.js";
import { GUI } from "../../node_modules/dat.gui/build/dat.gui.module.js";
import { GlobalState } from "./GlobalState.js";
import { PlanetManager } from "./Planets/PlanetManager.js";
import { ShaderManager } from "./Managers/ShaderManager/ShaderManager.js";
import { Sun } from "./Sun/Sun.js";
import { TextureManager } from "./Managers/TextureManager/TextureManager.js";
import { TimeControl } from "./Components/Time/TimeControl.js";
import { GameObserver } from "./Observers/GameObserver.js";
import { GameObjectManager } from "./Managers/GameObjectManager/GameObjectManager.js";
import { ObjectValidator } from "../utils/ObjectValidator.js";

export class GameManager {
    static scene;
    static debugGui;

    constructor(serviceProvider) {
        // Fields
        this.camera = {};
        this.cameraController = {};
        this.renderer = "";
        this.controls = "";
        this.sun = "";

        if (!ObjectValidator.IsValid(GameManager.scene)) {
            GameManager.scene = new THREE.Scene();
        }

        if (!ObjectValidator.IsValid(GameManager.debugGui)) {
            GameManager.debugGui = new GUI({ autoPlace: false });
            document.querySelector("#gui").append(GameManager.debugGui.domElement);
        }

        if (!ObjectValidator.IsValid(GameManager.gameObserver)) {
            GameManager.gameObserver = new GameObserver();
        }

        // Components
        this.gameObjectManager = {};
        this.gameState = {};
        this.dataLoaderProvider = {};
        this.planetManager = {};
        this.asteroidManager = {};
        this.cometManager = {};
        this.timeControl = {};
        this.shaderManager = {};
        this.textureManager = {};
        this.background = {};

        this.serviceProvider = serviceProvider;
    }

    async Initialise() {
        this.gameObjectManager = new GameObjectManager();
        this.gameState = new GlobalState();
        this.dataLoaderProvider = new DataLoaderProvider(this.serviceProvider);
        this.planetManager = new PlanetManager(this.serviceProvider, this.scene);
        this.asteroidManager = new AsteroidManager(this.serviceProvider);
        this.cometManager = new CometManager(this.serviceProvider);
        this.timeControl = new TimeControl(this.gameState, this.serviceProvider);
        this.shaderManager = new ShaderManager(this.serviceProvider);
        this.textureManager = new TextureManager(this.serviceProvider);
        this.background = new Background(this.scene);

        const asteroidDataLoader = await this.dataLoaderProvider.CreateDataLoader("Asteroids");
        await asteroidDataLoader.LoadAsync();

        const cometsDataLoader = await this.dataLoaderProvider.CreateDataLoader("Comets");
        await cometsDataLoader.LoadAsync();

        const planetDataLoader = await this.dataLoaderProvider.CreateDataLoader("Planets");
        await planetDataLoader.LoadAsync();
    }

    Start() {
        this.SetupScene();

        // Setup Debug GUI
        this.SetupDebugGUI();

        this.sun = new Sun();
    }

    Update() {
        // Update Planets
        this.gameObjectManager.UpdateGameObjects();

        this.planetManager.UpdatePlanets();
        this.asteroidManager.UpdateAsteroids();
        this.cometManager.UpdateComets();

        this.sun.Update();

        // this.renderer.render(this.scene, this.camera.GetControlledCamera());
    }

    SetupScene() {
        // this.camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
        this.renderer = new THREE.WebGLRenderer();

        this.SetupCamera();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("canvas-container").appendChild(this.renderer.domElement);

        this.background.Start(); // TODO: Move to game observer
    }

    SetupCamera() {
        this.camera = new Camera();
        this.cameraController = new CameraController(this.camera, this.renderer);

        this.camera.SetPosition(new THREE.Vector3(0, 20, 100));
    }

    SetupDebugHelpers() {
        const axesHelper = new THREE.AxesHelper(30);
        GameManager.scene.add(axesHelper);
    }

    SetupDebugGUI() {
        // Orbital mechanics section
        const orbitalMechanicsFolder = GameManager.debugGui.addFolder("Orbital Mechanics");
        orbitalMechanicsFolder.add(this.gameState, "timeMultiplier", -20, 20, 0.01);
        orbitalMechanicsFolder.add(this.gameState, "timeStepResolution", 1000, 100000, 100);
        orbitalMechanicsFolder.add(this.gameState, "isPaused").onChange(isPaused => {
            if (isPaused) {
                this.gameState.timeMultiplier = 0;
            } else {
                this.gameState.timeMultiplier = 1;
            }
        });

        // Physical section
        const globalPhysicalProperties = GameManager.debugGui.addFolder("Global Physical Properties");
        globalPhysicalProperties.add(this.gameState, "physicalRadiusMultiplier", 1, 25, 0.1);
        globalPhysicalProperties.add(this.gameState, "distanceToSunMultiplier", 1, 20, 0.1);

        this.SetupDebugHelpers();
    }
}
