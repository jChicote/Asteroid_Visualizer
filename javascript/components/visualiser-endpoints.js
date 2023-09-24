import { SendAsync } from './ApiInvoker.js';

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

const ServerProxyURL = "http://localhost:8080/proxy?url="

export async function GetPlanetEphermerisData(planetCode) {
    const apiUri = ServerProxyURL
        + "https://ssd.jpl.nasa.gov/api/horizons.api?"
        + "Command=" + planetCode + "&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=ELEMENTS&CENTER=500@10"; // TODO: Change this to a template literal

    try {
        const response = await SendAsync(HTTPMethods.GET, apiUri, true);

        // Split data into lines
        var lines = response.result.split("\n");

        const physicalBodyData = [];
        const ephemerisData = [];
        var hasPhysicalData = false;

        // Get all Physical Body Data
        for (const line of lines) {
            hasPhysicalData = line.includes("Ephemeris");

            if (line.includes("Column meaning:")) {
                break;
            }

            if (line.startsWith('$') || line.trim().startsWith('*') || !line.includes("=")) {
                continue;
            }

            if (!hasPhysicalData) {
                // if (line.includes("=")) {
                //     continue;
                // }

                const dataItems = line.match(/(.{1,40})/g);
                if (dataItems != null) {
                    dataItems.forEach((dataPoint) => {
                        const key = dataPoint.split("=")[0].trim();
                        const value = dataPoint.split("=")[1].trim();
                        physicalBodyData.push({key, value});
                    });
                }
            }
            else {

            }
        }

        console.log(physicalBodyData);

        // EXTRACT THE PHYSICAL DATA

        var physicalData = [];

        for (const line of cleanedData) {
            // if (line.trim().startsWith('*') || !line.includes("=")) {
            //     continue;
            // }

            // if (line.startsWith('$') || line.includes("Ephemeris")) {
            //     break;
            // }

            // Clean up each line so its better for the key value pairs to be found
            // const cleanedLine = line.replace(/\s*=\s*/g, '=').trim();
            // const valuePairs = cleanedLine.match(keyValuePairRegex);
            // if (valuePairs != null) {
            //     valuePairs.forEach((valuePair) => {
            //         const key = valuePair.split("=")[0].trim();
            //         const value = valuePair.split("=")[1].trim();
            //         physicalData.push({key, value});
            //     });
            // }
        }

        // EXTRACT THE EPHERMERIS DATA
        console.log(physicalData);
        return lines
    } catch(error) {
        console.error(error);
    }
}

export async function GetSmallBodyAsteroids() {
    const apiUri = ServerProxyURL + "https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=Eros";

    await SendAsync(HTTPMethods.GET, apiUri, true);
}
