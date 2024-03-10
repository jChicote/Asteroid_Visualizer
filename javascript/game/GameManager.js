import * as THREE from "three";
import Stats from "stats.js";
import { AsteroidManager } from "./Asteroids/AsteroidManager.js";
import { Background } from "./Scene/Background/Background.js";
import { Camera } from "./Camera/Camera.js";
import { CameraController } from "./Camera/CameraController.js";
import { CameraRaycaster } from "./Camera/CameraRaycaster.js";
import { CometManager } from "./Comets/CometManager.js";
import { DataLoaderProvider } from "./Infrastructure/DataLoaders/DataLoaderProvider.js";
import { EventManager } from "./Managers/EventManager/EventManager.js";
import { EventMediator } from "../user-interface/mediator/EventMediator.js";
import { GameObjectManager } from "./Managers/GameObjectManager/GameObjectManager.js";
import { GameObjectRegistry } from "./Providers/GameObjectRegistry.js";
import { GameObserver } from "./Observers/GameObserver.js";
import { GlobalState } from "./GlobalState.js";
import { ObjectValidator } from "../utils/ObjectValidator.js";
import { PlanetManager } from "./Planets/PlanetManager.js";
import { ReactCanvasManager } from "../user-interface/manager/canvas-manager/ReactCanvasManager.js";
import { ShaderManager } from "./Managers/ShaderManager/ShaderManager.js";
import { Sun } from "./Sun/Sun.js";
import { TargetManager } from "./Managers/TargetManager/TargetManager.js";
import { TextureManager } from "./Managers/TextureManager/TextureManager.js";
import { ThreeCanvasManager } from "./Managers/ThreeCanvasManager/ThreeCanvasManager.js";
import { TimeControl } from "./Components/Time/TimeControl.js";
import { TimeManager } from "./Managers/TimeManager/TimeManager.js";

export class GameManager {
    static scene;
    static renderer;
    static gameObserver;
    static gameObjectRegistry = new GameObjectRegistry();

    static stats;

    constructor(serviceProvider) {
        // Fields
        this.canvas = null;
        this.sun = "";

        // Static Fields
        if (!ObjectValidator.IsValid(GameManager.scene)) {
            GameManager.scene = new THREE.Scene();
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
        this.timeManager = new TimeManager({ gameState: this.gameState });
        this.targetManager = new TargetManager();

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
        this.cameraRaycaster = new CameraRaycaster({ camera: this.camera.GetControlledCamera() });
    }

    SetupDebugHelpers() {
        const axesHelper = new THREE.AxesHelper(30);
        GameManager.scene.add(axesHelper);
    }
}
