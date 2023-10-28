import { OrbitControls } from "./addons/OrbitControls.js";
import { PlanetCreationSystem } from "./javascript/game/Planets/PlanetCreationSystem.js";
import { Configuration } from "./javascript/shared/Configuration.js";
import { ServiceContainer } from "./javascript/shared/DependencyInjectionServices/ServiceContainer.js";
import { ServiceProvider } from "./javascript/shared/DependencyInjectionServices/ServiceProvider.js";
import * as TEST from "./javascript/test-scene.js";
import * as THREE from "./node_modules/three/build/three.module.js";
import { GameManager } from "./javascript/game/GameManager.js";

/**
 * Getter for the singleton instance of the service container.
 */
let serviceContainer;
export const Container = function() {
    return (function() {
        if (serviceContainer == null) {
            serviceContainer = new ServiceContainer();
        }

        return serviceContainer;
    })();
};

let gameManager;
export const VisualiserManager = function() {
    return (function() {
        if (gameManager == null) {
            gameManager = new GameManager(Container().Resolve(ServiceProvider));
        }

        return gameManager;
    })();
};

export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 4000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvas-container").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(0, 20, 100);
controls.update();

// Initializes scene
function init() {
    // Backend Initialisation
    const configuration = new Configuration();
    configuration.ConfigureProject();

    // Game / Visualiser Initialisation
    const visualiserManager = VisualiserManager();
    visualiserManager.Initialise();
}

function start() {
    TEST.CreateTestSolarSystemScene();

    (async () => {
        try {
            const container = Container();
            const serviceProvider = container.Resolve(ServiceProvider);
            const planetCreator = new PlanetCreationSystem(serviceProvider, scene);
            await planetCreator.CreateMainPlanets();
        } catch (error) {
            console.error("Error:", error);
        }
    })();
}

// This is the update loop for the scene
function animate() {
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

init();
start();
animate();
