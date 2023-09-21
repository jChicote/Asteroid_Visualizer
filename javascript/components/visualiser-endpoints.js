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

        // TODO: Create NewHorizonsApi formatter so that we have specific functionality to handle the response.
        // TODO: Create an object to store this data instead of a dictionary

        const cleanedData = [];


        // Way of cleaning:
        // - Ignore lines that contain * or have no =
        // - Empty the spaces around =
        // - Based on the value right of the =
        //      - The value should only hae a length of 16 characters or less
        //      - If it hits the end of line then from the = sign to the ", then its a value
        //      - If its the first pair and the length is 16 either add a seperator value or split from this point
        // - Split the data into each key, value pair
        // - Trim the extra whitespaces

        // Clean up the data
        for (const line of lines) {
            if (line.trim().startsWith('*') || !line.includes("=")) {
                continue;
            }

            if (line.includes("Column meaning:")) {
                break;
            }

            // const startcleaned = line.trimstart();
            const dataEntry = line.match(/(.{1,40})/g);
            //const cleanedLine = (line.replace(/\s*=\s*/g, '='));//.split(/\s{2,}/);
            console.log(dataEntry);
            const splitLine = cleanedLine.split(/\s{2,}/);
            cleanedData.push(splitLine);
        }

        console.log(cleanedData);

        // EXTRACT THE PHYSICAL DATA

        var physicalData = [];

        const keyValuePairRegex = /(\S.*?)\s*=\s*(.*?(?=\s+\S+\s*=|$))/g;
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
