import * as THREE from "three";
import { ObjectValidator } from "./ObjectValidator.js";

class MathHelper {
    static ConvertDegreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    static ConvertKilometersToAstronomicalUnits(kilometers) {
        return kilometers / 1.496e+8;
    }

    static Lerp3D(start, end, percent) {
        return {
            x: this.Lerp(start.x, end.x, percent),
            y: this.Lerp(start.y, end.y, percent),
            z: this.Lerp(start.z, end.z, percent)
        };
    }

    static Lerp(start, end, percent) {
        return start * (1 - percent) + end * percent;
    }

    static Clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    static IsNotZero(value) {
        return ObjectValidator.IsValid(value) && value !== 0;
    }

    static WorldSpaceToScreenSpace(worldPosition, canvasDimension, camera) {
        const screenPosition = new THREE.Vector3();
        const worldPosition4D = new THREE.Vector4(worldPosition.x, worldPosition.y, worldPosition.z, 1);
        const clipSpacePosition = worldPosition4D.applyMatrix4(camera.GetMatrixWorldInverse()).applyMatrix4(camera.GetProjectionMatrix());
        const ndc = new THREE.Vector3(clipSpacePosition.x / clipSpacePosition.w, clipSpacePosition.y / clipSpacePosition.w, clipSpacePosition.z / clipSpacePosition.w);

        screenPosition.x = (ndc.x + 1) / 2 * canvasDimension.width;
        screenPosition.y = (1 - ndc.y) / 2 * canvasDimension.height;

        return { x: screenPosition.x, y: screenPosition.y };
    }

    /// <summary>
    /// Returns the direction from source to target. This uses THREE.js Vector3.
    /// </summary>
    static GetDirectionToTarget(source, target) {
        return new THREE.Vector3().subVectors(target, source).normalize();
    }
}

export { MathHelper };
