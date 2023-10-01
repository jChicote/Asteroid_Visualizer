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
        var planetData = {
            captureData: {},
            heliocentricData: {},
            physicalBodyData: {}
        };

        var heliocentricSection = "";
        const heliocentricPattern = /\$\$SOE(.*?)\$\$EOE/s;

        const heliocentricMatch = response.match(heliocentricPattern);
        if (heliocentricMatch) {
            heliocentricSection = heliocentricMatch[0];
            console.log(heliocentricSection);
        }

        var physicalBodySection = "";
        const physicalBodyPattern = /PHYSICAL DATA[^]*?Ephemeris/s;

        const physicalBodyMatch = response.match(physicalBodyPattern);
        if (physicalBodyMatch) {
            physicalBodySection = physicalBodyMatch[0];
            console.log(physicalBodySection);
        }

        planetData.captureData = ExtractCaptureData(response);
        console.log(planetData.captureData);

        planetData.heliocentricData = ExtractHeliocentricData(response);
        console.log(planetData.heliocentricData);

        return planetData;
    } catch(error) {
        console.error(error);
    }
}

function ExtractCaptureData(response) {
    var ephemerisSection = "";
    const ephemerisPattern = /Ephemeris(.*?)JDTDB/s;

    const ephemerismatch = response.match(ephemerisPattern);
    if (ephemerismatch) {
        ephemerisSection = ephemerismatch[0].split("\n");
        console.log(ephemerisSection);
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

    return {
        startDate: {
            key: startDate.split(":")[0].trim(), 
            value: startDate.split(":")[1].trim()
        },
        endDate: {
            key: startDate.split(":")[0].trim(), 
            value: startDate.split(":")[1].trim()
        },
    }
}

function ExtractHeliocentricData(response) {
    var heliocentricSection = "";
    const heliocentricPattern = /\$\$SOE(.*?)\$\$EOE/s;

    const heliocentricMatch = response.match(heliocentricPattern);
    if (heliocentricMatch) {
        heliocentricSection = heliocentricMatch[0].split("\n"); // Take the first 5 lines
        heliocentricMatch.slice(1, 5);
        console.log(heliocentricSection);
    }

    const heliocentricDataMatch = heliocentricSection.match(/(\w+)\s*=\s*([\d.E+-]+)/g);
    
    if (heliocentricMatch) {
        // TODO: Implement matching by using the query aboove to split all items in preparation.
    }


    for (line in heliocentricSection) { 

    }

}

function ExtractPhysicalBodyData(response) {
    var physicalBodySection = "";
        const physicalBodyPattern = /PHYSICAL DATA[^]*?Ephemeris/s;

        const physicalBodyMatch = response.match(physicalBodyPattern);
        if (physicalBodyMatch) {
            physicalBodySection = physicalBodyMatch[0];
            console.log(physicalBodySection);
        }

}

export async function GetSmallBodyAsteroids() {
    const apiUri = ServerProxyURL + "https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=Eros";

    await SendAsync(HTTPMethods.GET, apiUri, true);
}
