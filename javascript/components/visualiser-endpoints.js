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

    console.log(apiUri);

    try {
        const response = await SendAsync(HTTPMethods.GET, apiUri, textContentOptions, true);

        console.log(response);
        // // Split data into lines
        // var lines = response.result.split("\n");

        // const planetData = {
        //     physicalBodyData: [],
        //     ephemerisData: [],
        //     heliocentricOrbitingElements: []
        // }
        // var hasPhysicalData = false;
        // var hasEphemerisData = false;
        // var hasHeliocentricData = false

        // // Get all Physical Body Data
        // for (const line of lines) {
        //     if (line.includes("Column meaning:")) {
        //         break;
        //     }

        //     if (line.trim().startsWith('*')) {
        //         continue;
        //     }

        //     if (!hasPhysicalData) {
        //         hasPhysicalData = line.includes("Ephemeris");

        //         const dataItems = line.match(/(.{1,40})/g);
        //         if (dataItems != null && dataItems.length != 0) {
        //             dataItems.forEach((dataPoint) => {
        //                 if (dataPoint.includes("=")) {
        //                     planetData.physicalBodyData.push({
        //                         key: dataPoint.split("=")[0].trim(),
        //                         value: dataPoint.split("=")[1].trim()
        //                     });
        //                 }
        //             });
        //         }
        //     }

        //     else if (!hasEphemerisData) {
        //         if (line.includes("Table cut-offs")) {
        //             hasEphemerisData = true;
        //             continue;
        //         }

        //         const dataPoint = line.replace(/{.*?}/g, '');
        //         planetData.ephemerisData.push({
        //             key: dataPoint.split(":")[0].trim(),
        //             value: dataPoint.split(":")[1].trim()
        //         });
        //     }
        // }

        // // Get the heliocentric orbiting elements from response instead of lines
        // var heliocentricSection = "";
        // const regPattern = /^\s*(\$\$SOE)\s*(.*?)\s*(\$\$EOE)\s*$/;

        // const match = response.result.match(regPattern);
        // if (match) {
        //     heliocentricSection = match[1];
        //     console.log(heliocentricSection);
        // }
        var planetData = "";

        return planetData;
    } catch(error) {
        console.error(error);
    }
}

export async function GetSmallBodyAsteroids() {
    const apiUri = ServerProxyURL + "https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=Eros";

    await SendAsync(HTTPMethods.GET, apiUri, true);
}
