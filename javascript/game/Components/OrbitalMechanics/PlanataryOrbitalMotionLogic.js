// import { CelestialOrbitalMotionLogic } from "./CelestialOrbitalMotionLogic.js";

// class PlanataryOrbitalMotionLogic extends CelestialOrbitalMotionLogic {
//     constructor() {
//         super();

//         this.PI = 3.14159265;
//         this.STARMASS = 1.989e30 * 6.67430e-11;
//         this.GRAVITATIONALCONSTANT = 6.67430e-11;
//         this.STARMASS = 1.989e30;
//         this.GRAVITATIONALMASS = 1.989e30 * 6.67430e-11;
//     }

//     CalculateOrbitalMotionForPlanets(
//         semiMajorAxis,
//         eccentricity,
//         inclination,
//         longitudeOfAscendingNode,
//         argumentOfPerihelion,
//         perihelionDistance,
//         meanAnomaly,
//         distanceScale) {
//         const eccentricAnomaly = this.CalculateEccentricAnomaly(meanAnomaly, eccentricity);

//         // Calculates the angular parameter representing the position of the body along a Keplerian Orbit.
//         // Source: https://en.wikipedia.org/wiki/True_anomaly
//         //      See 'From the eccentric anomaly' section.
//         const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));

//         // Invert the the values to make the planets orbit in the correct direction and inclination to the ecliptic.
//         const adjustedTrueAnomaly = trueAnomaly * -1;
//         const adjustedInclination = inclination;

//         // Finds the radial distance of the object within an ellipse in astronomical units.
//         //      - Converts the result into astronomical units as the raw value is in kilometers.
//         const adjustedSemiMajorAxis = semiMajorAxis / 1.496e+8;
//         const distanceFromSun = (adjustedSemiMajorAxis * (1 - eccentricity * eccentricity)) / (1 + eccentricity * Math.cos(trueAnomaly));

//         // Convert to 3D space coordinates - modified to use x and z as the orbital plane.
//         //      - This relies on the cartesian coordinate system, which this converts from the originate 'orbital plane coordinate system'
//         // Source: https://en.wikipedia.org/wiki/Orbital_elements
//         //      See 'Euler angle transformation'
//         const orbitalPosition = {
//             x: distanceFromSun * (Math.cos(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion + adjustedTrueAnomaly) -
//                 Math.sin(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion + adjustedTrueAnomaly) * Math.cos(adjustedInclination)),
//             y: (distanceFromSun * (Math.sin(argumentOfPerihelion + adjustedTrueAnomaly) * Math.sin(adjustedInclination))),
//             z: distanceFromSun * (Math.sin(longitudeOfAscendingNode) * Math.cos(argumentOfPerihelion + adjustedTrueAnomaly) +
//                 Math.cos(longitudeOfAscendingNode) * Math.sin(argumentOfPerihelion + adjustedTrueAnomaly) * Math.cos(adjustedInclination))
//         };

//         orbitalPosition.x *= distanceScale;
//         orbitalPosition.y *= distanceScale;
//         orbitalPosition.z *= distanceScale;

//         return orbitalPosition;
//     }
// }

// export { PlanataryOrbitalMotionLogic };
