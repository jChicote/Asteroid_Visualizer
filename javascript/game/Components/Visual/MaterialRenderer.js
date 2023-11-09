import * as THREE from "../../../../node_modules/three/build/three.module.js";
import { DefaultPlanetColor } from "../../../shared/Enumerations/DefaultPlanetColor.js";
import { PlanetCodes } from "../../../shared/Enumerations/PlanetCodes.js";

export class MaterialRenderer {
    constructor(planetCode) {
        this.material = new THREE.MeshBasicMaterial({ color: this.GetHexCode(planetCode) });
    }

    GetMaterial() {
        return this.material;
    }

    Render(planet) {
        // TODO: Implement behaviour to map using equi-rectangular projection
    }

    GetHexCode(planetCode) {
        switch (planetCode) {
            case PlanetCodes.Mercury.code:
                return DefaultPlanetColor.Mercury.hexCode;
            case PlanetCodes.Venus.code:
                return DefaultPlanetColor.Venus.hexCode;
            case PlanetCodes.Earth.code:
                return DefaultPlanetColor.Earth.hexCode;
            case PlanetCodes.Mars.code:
                return DefaultPlanetColor.Mars.hexCode;
            case PlanetCodes.Jupiter.code:
                return DefaultPlanetColor.Jupiter.hexCode;
            case PlanetCodes.Saturn.code:
                return DefaultPlanetColor.Saturn.hexCode;
            case PlanetCodes.Uranus.code:
                return DefaultPlanetColor.Uranus.hexCode;
            case PlanetCodes.Neptune.code:
                return DefaultPlanetColor.Neptune.hexCode;
            case PlanetCodes.Pluto.code:
                return DefaultPlanetColor.Pluto.hexCode;
            default:
                return 0x000000;
        }
    }
}
