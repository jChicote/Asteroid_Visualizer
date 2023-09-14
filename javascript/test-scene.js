import { scene } from '../main.js';
import { PlanetCreator } from './planet-creator.js';
import { StarCreator } from './star-creator.js';
import * as THREE from '/node_modules/three/build/three.module.js';

export function CreateTestSolarSystemScene() {

    // Note: The minimum scale that can be used for each planetary body should not be below 1.0
    // Note: The maximum scale for each planetary body should not be above 10000
    // Note: Distances used for each planet are not to scale. They are astronomical unit distances converted down:
    // distance = x * 10

    var distanceMultiplier = 20;
    var starCreator = new StarCreator(scene);
    var planetCreator = new PlanetCreator(scene);

    // Sun
    starCreator.CreateStar(5, 0xFFFFFF, new THREE.Vector3(0, 0, 0));

    // Mercury
    planetCreator.CreatePlanet(0.3, 0xC7C7C7, new THREE.Vector3(0.4 * distanceMultiplier, 0, 0));

    // Venus
    planetCreator.CreatePlanet(0.5, 0xFFC7C7, new THREE.Vector3(0.7 * distanceMultiplier, 0, 0));

    // Earth
    planetCreator.CreatePlanet(0.5, 0x0000FF, new THREE.Vector3(1. * distanceMultiplier, 0, 0));

    // Mars
    planetCreator.CreatePlanet(0.4, 0xFF0000, new THREE.Vector3(1.5 * distanceMultiplier, 0, 0));

    // Jupiter
    planetCreator.CreatePlanet(1.5, 0xFFC7C7, new THREE.Vector3(5.2 * distanceMultiplier, 0, 0));

    // Saturn
    planetCreator.CreatePlanet(1.2, 0xFFC7C7, new THREE.Vector3(9.5 * distanceMultiplier, 0, 0));

    // Uranus
    planetCreator.CreatePlanet(0.8, 0x4FD0E7, new THREE.Vector3(19.8 * distanceMultiplier, 0, 0));

    // Neptune
    planetCreator.CreatePlanet(0.8, 0x4b70dd, new THREE.Vector3(30 * distanceMultiplier, 0, 0));

    // Pluto
    planetCreator.CreatePlanet(0.2, 0xFFC7C7, new THREE.Vector3(39 * distanceMultiplier, 0, 0));
}