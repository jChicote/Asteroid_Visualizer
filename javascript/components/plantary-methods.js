
export function CalculatePlanetPosition(planetData) {
    // What needs to happen here:
    // - Will need to brush up the math involved
    // - We will need to find the heliocentric distance of the planet to the start
    //    - Need to find both the Mean anomaly, Semi-Major axis and the Orbital period
    // - All the data for each planet is not consistent
    //   - Instead of trying to get each one to fit, different extraction methods will exist depending on what can be retrieved
    
    
    const extractedData = GetSimplifiedData(planetData);

    const semiMajorAxis = Number(extractedData.equatorialRadius); // in km
    const orbitalPeriodDays = Number(extractedData.meanSiderealOrbitalPeriod); // in days
    const endDate = extractedData.endDate;

    // Convert the start date to a Date object
    const startDate = new Date(extractedData.startDate);

    // Calculate the number of days from a reference epoch (epoch of perihelion)
    // to the start date
    const referenceEpoch = new Date("2023-09-16");  // Reference epoch (adjust as needed)
    const daysFromReferenceEpoch = Math.floor((startDate - referenceEpoch) / (24 * 60 * 60 * 1000));

   // Calculate the mean anomaly (M) for the start date
    const meanAnomalyDegrees = (360 * daysFromReferenceEpoch) / orbitalPeriodDays;

    // Convert the mean Anomaly to radians
    var meanAnomalyInRadians = meanAnomalyDegrees * (Math.PI / 180.0); // Takes the mean anomaly in degrees and converts it to radians

    // Calculate the heliocentric coordinates
    var heliocentricVector = {
        x: semiMajorAxis * Math.cos(meanAnomalyInRadians),
        y: semiMajorAxis * Math.sin(meanAnomalyInRadians),
        z: 0 // This just ensures that the planet is in the same plane as the sun
    }

    console.log("Rough Heliocentric Coordinates (x, y, z): " + heliocentricVector.x + ", " + heliocentricVector.y + ", " + heliocentricVector.z);
    return heliocentricVector;
}

function GetSimplifiedData(planetData) {
    const simpleData = {
        equatorialRadius: DataSearch("Sidereal rot. period", planetData).match(/[0-9.]+/g).join(''), // This needs to be calculated in km and not in earth rotation. This might differe between each response
        meanSiderealOrbitalPeriod: DataSearchWithAdditionalSearchParameters("Sidereal orb. per.", /\bd\b\s*/g, true, planetData).match(/[0-9.]+/g).join(''),
        startDate: "2022-01-01", // fixed date for now
        endDate: "12:00:00", // fixed date for now
    }

    return simpleData;
}

function DataSearch(key, planetData) {
    for (const dataPoint of planetData.physicalBodyData) {
        if (dataPoint.key.includes(key)) {
            return dataPoint.value;
        }
    }
    console.log("Nothing was found");

}

function DataSearchWithAdditionalSearchParameters(key, searchRegex, canSearchValue, planetData) {
    for (const dataPoint of planetData.physicalBodyData) {
        if (dataPoint.key.includes(key) && searchRegex.test(dataPoint.key) || (canSearchValue && searchRegex.test(dataPoint.value))) {
            return dataPoint.value;
        }
    }

    console.log("Nothing was found");
}

function GetEarthSiderealRotationInHours() {
    return 
}