import Stats from "stats.js";
import * as THREE from "three";
import { GUI } from "../../node_modules/dat.gui/build/dat.gui.module.js";
import { ReactCanvasManager } from "../user-interface/manager/canvas-manager/ReactCanvasManager.js";
import { EventMediator } from "../user-interface/mediator/EventMediator.js";
import { ObjectValidator } from "../utils/ObjectValidator.js";
import { AsteroidManager } from "./Asteroids/AsteroidManager.js";
import { Camera } from "./Camera/Camera.js";
import { CameraController } from "./Camera/CameraController.js";
import { CometManager } from "./Comets/CometManager.js";
import { TimeControl } from "./Components/Time/TimeControl.js";
import { GlobalState } from "./GlobalState.js";
import { DataLoaderProvider } from "./Infrastructure/DataLoaders/DataLoaderProvider.js";
import { EventManager } from "./Managers/EventManager/EventManager.js";
import { GameObjectManager } from "./Managers/GameObjectManager/GameObjectManager.js";
import { ShaderManager } from "./Managers/ShaderManager/ShaderManager.js";
import { TextureManager } from "./Managers/TextureManager/TextureManager.js";
import { ThreeCanvasManager } from "./Managers/ThreeCanvasManager/ThreeCanvasManager.js";
import { GameObserver } from "./Observers/GameObserver.js";
import { PlanetManager } from "./Planets/PlanetManager.js";
import { GameObjectRegistry } from "./Providers/GameObjectRegistry.js";
import { Background } from "./Scene/Background/Background.js";
import { Sun } from "./Sun/Sun.js";

export class GameManager {
    static scene;
    static renderer;
    static gameObserver;
    static gameObjectRegistry = new GameObjectRegistry();

    // debug screens
    static debugGui;
    static stats;

    constructor(serviceProvider) {
        // Fields
        this.canvas = null;
        this.sun = "";

        // Static Fields
        if (!ObjectValidator.IsValid(GameManager.scene)) {
            GameManager.scene = new THREE.Scene();
        }

        if (!ObjectValidator.IsValid(GameManager.debugGui)) {
            GameManager.debugGui = new GUI({ autoPlace: false });
            document.querySelector("#debug-gui").append(GameManager.debugGui.domElement);
        }

        if (!ObjectValidator.IsValid(GameManager.stats)) {
            GameManager.stats = new Stats();
            GameManager.stats.showPanel(1);
            document.querySelector("#stats").append(GameManager.stats.dom);
        }

        if (!ObjectValidator.IsValid(GameManager.gameObserver)) {
            GameManager.gameObserver = new GameObserver();
        }

        this.serviceProvider = serviceProvider;
    }

    async Initialise() {
        // Initialise Game Services and Managers
        this.reactCanvas = new ReactCanvasManager(); // Needs to be refactored out to the ServiceContainer instead.
        this.threeCanvas = new ThreeCanvasManager();

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

        // Initialise Camera
        this.camera = {};
        this.cameraController = {};

        const eventMediator = this.serviceProvider.GetService(EventMediator);

        // Load celestial objects
        const asteroidDataLoader = await this.dataLoaderProvider.CreateDataLoader("Asteroids");
        await asteroidDataLoader.LoadAsync();
        eventMediator.Notify("UpdateLoadingBar", 65);

        const cometsDataLoader = await this.dataLoaderProvider.CreateDataLoader("Comets");
        await cometsDataLoader.LoadAsync();
        eventMediator.Notify("UpdateLoadingBar", 70);

        const planetDataLoader = await this.dataLoaderProvider.CreateDataLoader("Planets");
        await planetDataLoader.LoadAsync();
        eventMediator.Notify("UpdateLoadingBar", 75);
    }

    Start() {
        this.SetupScene();
        this.gameState.canUpdate = true;

        // Subscribe time methods
        GameManager.gameObserver.Subscribe("UpdateTimeMultiplier", this.SetTimeMultiplier.bind(this));
        GameManager.gameObserver.Subscribe("UpdateIsTimePaused", this.SetIsTimePaused.bind(this));
        GameManager.gameObserver.Subscribe("ResetTimeControls", this.ResetTimeControls.bind(this));
    }

    Update() {
        GameManager.stats.begin(); // Only for debug performance purposes

        this.gameObjectManager.UpdateGameObjects();
        this.sun.Update();

        GameManager.renderer.render(GameManager.scene, this.camera.GetControlledCamera());

        GameManager.stats.end(); // Only for debug performance purposes
    }

    SetupScene() {
        const container = document.getElementById("threeCanvas");
        GameManager.renderer = new THREE.WebGLRenderer({ antialias: true });
        GameManager.renderer.setSize(window.innerWidth, container.clientHeight);
        container.appendChild(GameManager.renderer.domElement);

        this.background = new Background();
        this.sun = new Sun();

        this.SetupCamera();
    }

    SetupCamera() {
        this.camera = new Camera();
        this.cameraController = new CameraController(this.camera, GameManager.renderer);
    }

    SetupDebugHelpers() {
        const axesHelper = new THREE.AxesHelper(30);
        GameManager.scene.add(axesHelper);
    }

    SetTimeMultiplier(timeDirection) {
        this.gameState.timeMultiplier += timeDirection;
    }

    SetIsTimePaused(isPaused) {
        this.gameState.isPaused = isPaused;
    }

    ResetTimeControls() {
        this.gameState.timeMultiplier = 0.01; // Default configurations will need to exist in the future.
        this.gameState.isPaused = false;
    }

    // SetupDebugGUI() {
    //     // Orbital mechanics section
    //     const orbitalMechanicsFolder = GameManager.debugGui.addFolder("Orbital Mechanics");
    //     orbitalMechanicsFolder.add(this.gameState, "timeMultiplier", -20, 20, 0.01);
    //     orbitalMechanicsFolder.add(this.gameState, "timeStepResolution", 1000, 100000, 100);
    //     orbitalMechanicsFolder.add(this.gameState, "isPaused").onChange(isPaused => {
    //         if (isPaused) {
    //             this.gameState.timeMultiplier = 0;
    //         } else {
    //             this.gameState.timeMultiplier = 1;
    //         }
    //     });

    //     // Physical section
    //     const globalPhysicalProperties = GameManager.debugGui.addFolder("Global Physical Properties");
    //     globalPhysicalProperties.add(this.gameState, "physicalRadiusMultiplier", 1, 25, 0.1);
    //     globalPhysicalProperties.add(this.gameState, "distanceToSunMultiplier", 1, 20, 0.1);

    //     // Scene section
    //     const sceneProperties = GameManager.debugGui.addFolder("Scene Properties");
    //     sceneProperties.add(this.gameState, "isLightActive").onChange(isLightActive => {
    //         if (isLightActive) {
    //             this.camera.cameraLight.EnableLight();
    //         } else {
    //             this.camera.cameraLight.DisableLight();
    //         }
    //     });
    //     sceneProperties.add(this.gameState, "lightIntensity", 10, 200, 1).onChange(lightIntensity => {
    //         this.camera.cameraLight.SetLightIntensity(lightIntensity);
    //     });

    //     // Canvas section
    //     const canvasProperties = GameManager.debugGui.addFolder("Canvas Properties");
    //     canvasProperties.add(this.gameState, "isFullScreen").onChange(isFullScreen => {
    //         if (isFullScreen) {
    //             this.canvas.SetToFullScreen();
    //         } else {
    //             this.canvas.SetToDefault();
    //         }
    //     });

    //     this.SetupDebugHelpers();
    // }
}
