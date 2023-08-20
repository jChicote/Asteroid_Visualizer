import * as THREE from '/node_modules/three/build/three.module.js';
import { scene } from '../main.js';

function CreatePlanet(radius, hexColor) {
    var planet = new THREE.Mesh(
         new THREE.SphereGeometry( radius, 32, 16 ), 
         new THREE.MeshBasicMaterial( { color: hexColor  } ) ); 
         
    scene.add( planet );
    return planet
}

export function CreateTestSolarSystemScene() {
    var Sun = CreatePlanet(5, 0xFFFFFF);
    Sun.position.set(0, 0, 0);

    var mecury = CreatePlanet(0.3, 0xC7C7C7);
    mecury.position.set(8, 0, 0);

    var venus = CreatePlanet(0.5, 0xFFC7C7);
    venus.position.set(12, 0, 0);

    var earth = CreatePlanet(0.5, 0x0000FF);
    earth.position.set(16, 0, 0);

    var mars = CreatePlanet(0.4, 0xFF0000);
    mars.position.set(20, 0, 0);

    var jupiter = CreatePlanet(1.5, 0xFFC7C7);
    jupiter.position.set(32, 0, 0);

    var saturn = CreatePlanet(1.2, 0xFFC7C7);
    saturn.position.set(40, 0, 0);

    var uranus = CreatePlanet(0.8, 0xFFC7C7);
    uranus.position.set(56, 0, 0);

    var neptune = CreatePlanet(0.8, 0xFFC7C7);
    neptune.position.set(70, 0, 0);

    var pluto = CreatePlanet(0.2, 0xFFC7C7);
    pluto.position.set(90, 0, 0);

    console.log("Generating solar system");
}