export class PlanetLocator {
    async CalculatePlanetPosition(planetData) {
        // TODO: This should be done within the use case interactor
        const meanAnomaly = parseFloat(planetData.meanAnomaly);
        const eccentricity = parseFloat(planetData.eccentricity);
        const semiMajorAxis = parseFloat(planetData.semiMajorAxis);

        // TODO: Simplify the calculation
        const eccentricAnomaly = meanAnomaly + eccentricity * Math.sin(meanAnomaly);
        const trueAnomaly = 2 * Math.atan(Math.sqrt((1 + eccentricity) / (1 - eccentricity)) * Math.tan(eccentricAnomaly / 2));

        const distanceRadiusFromSun = semiMajorAxis * (1 - eccentricity * Math.cos(eccentricAnomaly));

        const x = distanceRadiusFromSun * Math.cos(trueAnomaly);
        const y = distanceRadiusFromSun * Math.sin(trueAnomaly);

        return { x: x * 0.0000005, y: 0, z: y * 0.0000005 };
    }
}
