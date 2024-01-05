import * as THREE from "../../node_modules/three/build/three.module.js";
import { AsteroidManager } from "./Asteroids/AsteroidManager.js";
import { Background } from "./Scene/Background/Background.js";
import { Camera } from "./Camera/Camera.js";
import { CameraController } from "./Camera/CameraController.js";
import { CometManager } from "./Comets/CometManager.js";
import { DataLoaderProvider } from "./Infrastructure/DataLoaders/DataLoaderProvider.js";
import { EventManager } from "./Managers/EventManager/EventManager.js";
import { GUI } from "../../node_modules/dat.gui/build/dat.gui.module.js";
import { GameObjectManager } from "./Managers/GameObjectManager/GameObjectManager.js";
import { GameObserver } from "./Observers/GameObserver.js";
import { GlobalState } from "./GlobalState.js";
import { ObjectValidator } from "../utils/ObjectValidator.js";
import { PlanetManager } from "./Planets/PlanetManager.js";
import { ShaderManager } from "./Managers/ShaderManager/ShaderManager.js";
import { Sun } from "./Sun/Sun.js";
import { TextureManager } from "./Managers/TextureManager/TextureManager.js";
import { TimeControl } from "./Components/Time/TimeControl.js";

export class GameManager {
    static scene;
    static debugGui;
    static gameObserver;

    constructor(serviceProvider) {
        // Fields
        this.camera = {};
        this.cameraController = {};
        this.renderer = "";
        this.sun = "";

        // Static Fields
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

        this.serviceProvider = serviceProvider;
    }

    async Initialise() {
        this.eventManager = new EventManager();
        this.gameObjectManager = new GameObjectManager();
        this.gameState = new GlobalState();
        this.eventManager = new EventManager();
        this.dataLoaderProvider = new DataLoaderProvider(this.serviceProvider);
        this.planetManager = new PlanetManager(this.serviceProvider, this.scene);
        this.asteroidManager = new AsteroidManager(this.serviceProvider);
        this.cometManager = new CometManager(this.serviceProvider);
        this.timeControl = new TimeControl(this.gameState, this.serviceProvider);
        this.shaderManager = new ShaderManager(this.serviceProvider);
        this.textureManager = new TextureManager(this.serviceProvider);

        // Load celestial objects
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

        this.gameState.canUpdate = true;
    }

    Update() {
        this.gameObjectManager.UpdateGameObjects();
        this.sun.Update();

        this.renderer.render(GameManager.scene, this.camera.GetControlledCamera());
    }

    SetupScene() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("canvas-container").appendChild(this.renderer.domElement);

        this.background = new Background();
        this.sun = new Sun();

        this.SetupCamera();
    }

    SetupCamera() {
        this.camera = new Camera();
        this.cameraController = new CameraController(this.camera, this.renderer);
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

        // Scene section
        const sceneProperties = GameManager.debugGui.addFolder("Scene Properties");
        sceneProperties.add(this.gameState, "isLightActive").onChange(isLightActive => {
            if (isLightActive) {
                this.camera.cameraLight.EnableLight();
            } else {
                this.camera.cameraLight.DisableLight();
            }
        });
        sceneProperties.add(this.gameState, "lightIntensity", 10, 200, 1).onChange(lightIntensity => {
            this.camera.cameraLight.SetLightIntensity(lightIntensity);
        });

        this.SetupDebugHelpers();
    }
}
