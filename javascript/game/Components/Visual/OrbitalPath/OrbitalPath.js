import * as THREE from "three";
import { GameManager } from "../../../GameManager";

class OrbitalPath {
    constructor(props) {
        this.orbitalMotionLogic = props.orbitalMotionLogic;
        this.highlightColor = props.highlightColor;
        this.normalColor = props.normalColor;

        this.orbitalLine = null;
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    CreateOrbitalPath(parameters) {
        const verticies = this.CalculateOrbitalPathPositions(parameters);
        const geometry = new THREE.BufferGeometry().setFromPoints(verticies);
        const material = new THREE.LineBasicMaterial({ color: this.normalColor });
        const line = new THREE.Line(geometry, material);

        GameManager.scene.add(line);

        this.orbitalLine = line;
        return line;
    }

    CalculateOrbitalPathPositions(parameters) {
        const verticies = [];

        for (let i = 0; i <= parameters.lineSegments; i++) {
            // Calculate the mean anomaly for the current segment
            const meanAnomalyForSegment = parameters.meanAnomaly + (2 * Math.PI / parameters.lineSegments) * i;

            // Calculate the orbital position for the current segment
            const orbitalPosition = this.orbitalMotionLogic.CalculateOrbitalPosition(
                parameters.semiMajorAxis,
                parameters.eccentricity,
                parameters.inclination,
                parameters.longitudeOfAscendingNode,
                parameters.argumentOfPerihelion,
                meanAnomalyForSegment,
                parameters.scale
            );

            // Add the calculated position to the vertices array
            verticies.push(new THREE.Vector3(orbitalPosition.x, orbitalPosition.y, orbitalPosition.z));
        }

        return verticies;
    }

    HighlightOrbitalPathLine() {
        console.log("This is highlighted");
        this.orbitalLine.material.color.set(this.highlightColor);
    }

    DeselectOrbitalPathLine() {
        this.orbitalLine.material.color.set(this.normalColor);
    }
}

export { OrbitalPath };
