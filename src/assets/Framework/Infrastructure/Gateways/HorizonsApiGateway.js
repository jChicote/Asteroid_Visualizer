import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { GatewayViewModel } from "./Common/GatewayViewModels.js";

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

export class HorizonsApiGateway {
    constructor(serviceDependencies) {
        this.gatewayClient = ServiceExtractor.ObtainService(serviceDependencies, "GatewayClient");
        this.uriProvider = ServiceExtractor.ObtainService(serviceDependencies, "HorizonsApiUriProvider");
    }

    async GetPlanetEphemerisData(planetCode) {
        try {
            console.log(this.uriProvider.Provide(planetCode));
            const response = await this.gatewayClient.SendAsync(this.uriProvider.Provide(planetCode));
            if (response.status === 200) {
                const planetData = {
                    captureSection: {},
                    heliocentricSection: {},
                    physicalBodySection: {}
                };

                planetData.captureSection = this.ExtractCaptureSection(response.content.result);
                planetData.heliocentricSection = this.ExtractHeliocentricSection(response.content.result);
                planetData.physicalBodySection = this.ExtractPhysicalBodySection(response.content.result);

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
        const ephemerisPattern = /Ephemeris(.*?)\$\$SOE/s;
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
