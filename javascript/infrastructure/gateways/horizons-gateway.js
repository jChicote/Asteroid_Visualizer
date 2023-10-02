import { SendAsync } from '../ApiInvoker.js';

export const PlanetCodes = {
    Mercury : "199",
    Venus : "299",
    Earth : "399",
    Mars : "499",
    Jupiter : "599",
    Saturn : "699",
    Uranus : "799",
    Neptune : "899",
    Pluto : "999"
}

const HTTPMethods =  {
    GET : "GET",
    POST : "POST",
    PUT : "PUT",
    DELETE : "DELETE"
}

// TODO: Move the URL along with the content options into a configuration file for the application.
const ServerProxyURL = "http://localhost:8080/proxy?url="

const textContentOptions = [
    {name: "Authorization", value: "Bearer YOUR_ACCESS_TOKEN"},
    {name: "Content-Type", value: "text/plain"},
];

const jsonContentOptions = [
    {name: "Authorization", value: "Bearer YOUR_ACCESS_TOKEN"},
    {name: "Content-Type", value: "application/json"},
];

// TODO: This will need to be moved into its architecture
// - This class has too many responsibilities?: It contains both the route to the server and controller interacting behaviour
export async function GetPlanetEphemerisData(planetCode) {
    const contentType = "text";
    const encodedUri = encodeURIComponent("https://ssd.jpl.nasa.gov/api/horizons.api?"
                            + "COMMAND=" + planetCode + "&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=ELEMENTS&CENTER=500@10&format=" + contentType);
    const apiUri = ServerProxyURL + encodedUri; // TODO: Change this to a template literal

    try {
        const response = await SendAsync(HTTPMethods.GET, apiUri, textContentOptions, true);
        var planetData = {
            captureData: {},
            heliocentricData: {},
            physicalBodyData: {}
        };

        planetData.captureData = ExtractCaptureData(response);
        planetData.heliocentricData = ExtractHeliocentricData(response);
        planetData.physicalBodyData = ExtractPhysicalBodyData(response);

        console.log(planetData);
        return planetData;
    } catch(error) {
        console.error(error);
    }
}

// TODO: Move the funcitons below as seperate service functions for the gateway.
function ExtractCaptureData(response) {
    var ephemerisSection = "";
    const ephemerisPattern = /Ephemeris(.*?)JDTDB/s;

    const ephemerismatch = response.match(ephemerisPattern);
    if (ephemerismatch) {
        ephemerisSection = ephemerismatch[0].split("\n");
    }

    var startDate = "";
    var endDate = "";
    
    ephemerisSection.forEach(element => {
        if (element.includes("Start time")) {
            startDate = element;
        }

        else if (element.includes("Stop  time")) {
            endDate = element;
        }
    })

    const parseData = dateString => {
        const [dateKey, dateValue] = dateString.split(":").map(item => item.trim());
        return { key: dateKey, value: dateValue };
    }

    return {
        startDate: parseData(startDate),
        endDate: parseData(endDate)
    }
}

function ExtractHeliocentricData(response) {
    var heliocentricSection = [];

    var heliocentricData = {
        eccentricity: "",
        meanAnomaly: "",
        semiMajorAxis: "",
    }

    const heliocentricPattern = /\$\$SOE(.*?)\$\$EOE/s;
    const heliocentricMatch = response.match(heliocentricPattern);
    if (heliocentricMatch) {
        heliocentricSection = heliocentricMatch[0].split("\n").slice(2, 6); // Take the first 4 lines containing the data points
    }

    // Process heliocentric data and set values in heliocentricData object
    if (heliocentricSection != undefined && heliocentricSection.length != 0) {
        for (const line of heliocentricSection) {
            const dataPoints = line.trim().match(/(\w+)\s*=\s*([\d.E+-]+)/g);
            if (dataPoints != null && dataPoints.length != 0) {
                dataPoints.forEach((dataPoint) => {
                    const data = {
                        key: dataPoint.split("=")[0].trim(),
                        value: dataPoint.split("=")[1].trim()
                    }
                    
                    if (data.key == "EC") {
                        heliocentricData.eccentricity = data.value;
                    }
                    else if (data.key == "MA") {
                        heliocentricData.meanAnomaly = data.value;
                    }
                    else if (data.key == "A") {
                        heliocentricData.semiMajorAxis = data.value;
                    }
                });
            }
        }
    }

    return heliocentricData;
}

// TODO: Make this work for the planet earth, as it uses a different set of headers.
function ExtractPhysicalBodyData(response) {
    var physicalBodySection = [];
    const physicalBodyData = {
        obliquityToOrbit: "",
        orbitalSpeed: "",
        planateryRadius: "",
        meanSolarDay: "",
    }

    const physicalBodyPattern = /PHYSICAL DATA[^]*?Ephemeris/s;
    const physicalBodyMatch = response.match(physicalBodyPattern);
    if (physicalBodyMatch) {
        physicalBodySection = physicalBodyMatch[0].split("\n");

        for (const line of physicalBodySection) {
            if (line.trim().startsWith("*") || !line.includes("=")) {
                continue;
            }

            const dataPoints = line.match(/(.{1,40})/g);
            if (dataPoints != null && dataPoints.length != 0) {
                dataPoints.forEach((dataPoint) => {
                    if (dataPoint.includes("=")) {
                        const data = {
                            key: dataPoint.split("=")[0].trim(),
                            value: dataPoint.split("=")[1].trim()
                        };

                        // TODO: Create an options parameter in the future to contain the search options for the physical datapoints.
                        if (data.key.includes("Obliquity to orbit")) {
                            physicalBodyData.obliquityToOrbit = data.value;
                        }
                        else if (data.key.includes("Orbital speed") || data.key.includes("Mean Orbit vel") || data.key.includes("Orbit speed") || data.key.includes("Mean orbit speed") || data.key.includes("Mean orbit velocity")) {
                            physicalBodyData.orbitalSpeed = data.value;
                        }
                        else if (data.key.toLowerCase().includes("vol. mean radius")) {
                            physicalBodyData.planateryRadius = data.value;
                        }
                        else if (data.key.includes("Mean solar day")) {
                            physicalBodyData.meanSolarDay = data.value;
                        }
                    }
                });
            }
        }

        return physicalBodyData;
    }
}

//TODO: Move this out to its own gateway
export async function GetSmallBodyAsteroids() {
    const apiUri = ServerProxyURL + "https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=Eros";

    await SendAsync(HTTPMethods.GET, apiUri, true);
}
