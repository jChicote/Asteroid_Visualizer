import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { GetProxyServerUrl } from "../../Services/Providers/serverProxyUriProvider.js";
import { GatewayViewModel } from "./Common/GatewayViewModels.js";
import { textContentOptions } from "./Configuration/gateway-options.js";
import { GatewayClient } from "./GatewayClient.js";

export const PlanetCodes = {
    Mercury: "199",
    Venus: "299",
    Earth: "399",
    Mars: "499",
    Jupiter: "599",
    Saturn: "699",
    Uranus: "799",
    Neptune: "899",
    Pluto: "999"
};

const HTTPMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

export class HorizonsApiGateway {
    constructor(serviceDependencies) {
        this.gatewayClient = ServiceExtractor.ObtainService(serviceDependencies, GatewayClient);
    }

    async GetPlanetEphemerisData(planetCode) {
        const contentType = "text";
        const encodedUri = encodeURIComponent("https://ssd.jpl.nasa.gov/api/horizons.api?" +
            "COMMAND=" + planetCode + "&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=ELEMENTS&CENTER=500@10&format=" + contentType);
        const apiUri = GetProxyServerUrl() + encodedUri; // TODO: Change this to a template literal

        try {
            const response = await this.gatewayClient.SendAsync(HTTPMethods.GET, apiUri, textContentOptions, true);

            if (response.status === 200) {
                const planetData = {
                    captureSection: {},
                    heliocentricSection: {},
                    physicalBodySection: {}
                };

                planetData.captureSection = this.ExtractCaptureSection(response.content);
                planetData.heliocentricSection = this.ExtractHeliocentricSection(response.content);
                planetData.physicalBodySection = this.ExtractPhysicalBodySection(response.content);

                return new GatewayViewModel(true, planetData, null);
            } else if (response.status === 400) {
                console.log("encountered a 400 error");
                return new GatewayViewModel(false, null, response);
            } else {
                return new GatewayViewModel(false, null, response);
            }
        } catch (error) {
            console.error(error);
            return new GatewayViewModel(false, null, response);
        }
    }

    ExtractCaptureSection(response) {
        const ephemerisPattern = /Ephemeris(.*?)JDTDB/s;
        let ephemerisSection = "";

        const ephemerisMatch = response.match(ephemerisPattern);
        if (ephemerisMatch) {
            ephemerisSection = ephemerisMatch[0].split("\n");
        }

        return ephemerisSection;
    }

    ExtractHeliocentricSection(response) {
        const heliocentricPattern = /\$\$SOE(.*?)\$\$EOE/s;
        const heliocentricMatch = response.match(heliocentricPattern);
        let heliocentricSection = [];

        if (heliocentricMatch) {
            heliocentricSection = heliocentricMatch[0].split("\n").slice(2, 6); // Take the first 4 lines containing the data points
        }

        return heliocentricSection;
    }

    ExtractPhysicalBodySection(response) {
        let physicalBodyMatch = "";

        if (response.includes("PHYSICAL DATA")) {
            const physicalBodyPattern = /PHYSICAL DATA[^]*?Ephemeris/s;
            physicalBodyMatch = response.match(physicalBodyPattern);
        } else if (response.includes("GEOPHYSICAL PROPERTIES")) {
            const physicalBodyPattern = /GEOPHYSICAL PROPERTIES[^]*?Ephemeris/s;
            physicalBodyMatch = response.match(physicalBodyPattern);
        }

        if (physicalBodyMatch) {
            return physicalBodyMatch[0].split("\n");
        }

        return [];
    }
}
