// import { CalculatePlanetPosition } from './javascript/assets/infrastructure/plantary-methods.js';
import { GetPlanetEphemerisData, PlanetCodes } from './javascript/assets/infrastructure/gateways/horizons-gateway.js';
import { PlanetCreator } from './javascript/planet-creator.js';
import { serviceContainer, RegisterAllServices } from './javascript/shared/DepedencyInjectionServices/ServiceContainer.js';
import { OrbitControls } from '/addons/OrbitControls.js';
import * as TEST from '/javascript/test-scene.js';
import * as THREE from '/node_modules/three/build/three.module.js';

export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById('canvas-container').appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 20, 100 );
controls.update();

// Test planet renderer
var mercuryPosition = {x: 0, y: 0, z: 0};
var venusPosition = {x: 0, y: 0, z: 0};
var earthPosition = {x: 0, y: 0, z: 0};
var marsPosition = {x: 0, y: 0, z: 0};
var jupiterPosition = {x: 0, y: 0, z: 0};
var saturnPosition = {x: 0, y: 0, z: 0};
var uranusPosition = {x: 0, y: 0, z: 0};
var neptunePosition = {x: 0, y: 0, z: 0};
var plutoPosition = {x: 0, y: 0, z: 0};

// Initializes scene
function init() {
    //GetSmallBodyAsteroids();
    // RegisterAllServices();

    // const getMainPlanetsPresenter = serviceContainer.build(GetMainPlanetsPresenter);
    // getMainPlanetsPresenter.testMethodDependencyInjection();
}

function start() {
    TEST.CreateTestSolarSystemScene();

    (async () => {
        try {
            const planetCreator = new PlanetCreator(scene);

            const mercuryData = await GetPlanetEphemerisData(PlanetCodes.Mercury);
            // mercuryPosition = CalculatePlanetPosition(mercuryData);
            // planetCreator.CreatePlanet(1, 0xC7C7C7, new THREE.Vector3(mercuryPosition.x, mercuryPosition.z, mercuryPosition.y));

            // const venusData = await GetPlanetEphemerisData(PlanetCodes.Venus);
            // venusPosition = CalculatePlanetPosition(venusData);
            // planetCreator.CreatePlanet(1, 0xFFC7C7, new THREE.Vector3(venusPosition.x, venusPosition.z, venusPosition.y));

            // const earthData = await GetPlanetEphemerisData(PlanetCodes.Earth);
            // earthPosition = CalculatePlanetPosition(earthData);
            // planetCreator.CreatePlanet(1, 0xFFC7C7, new THREE.Vector3(earthPosition.x, earthPosition.z, earthPosition.y));

            // const marsData = await GetPlanetEphemerisData(PlanetCodes.Mars);
            // marsPosition = CalculatePlanetPosition(marsData);
            // planetCreator.CreatePlanet(1, 0xFFC7C7, new THREE.Vector3(marsPosition.x, marsPosition.z, marsPosition.y));

            // console.log("This should run at the end/")
            // var pointLightHelper = new THREE.PointLightHelper( mercury, 5);
            // scene.add( pointLightHelper );
        }
        catch (error) {
            console.error('Error:', error);
        }
    })();
}

// This is the update loop for the scene
function animate() {
	requestAnimationFrame( animate );

    controls.update();

	renderer.render( scene, camera );
}

init();
start();
animate();