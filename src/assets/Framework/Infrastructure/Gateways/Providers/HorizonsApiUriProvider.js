import { ServiceExtractor } from "../../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { protocol, hostName, routePath, isInDevelopment } from "../Configuration/gateway-options.js";

export class HorizonsApiUriProvider {
    constructor(serviceDependencies) {
        this.serverUrlProvider = ServiceExtractor.ObtainService(serviceDependencies, "ProxyServerUrlProvider");
    }

    Provide(planetCode) {
        // const formatType = "json"; // Format to json as the GatewayClient decodes the content

        // Encode the URI to properly and safely transmit the data
        // const encodedUri =
        //     encodeURIComponent("https://ssd.jpl.nasa.gov/api/horizons.api?" +
        //         "COMMAND=" + planetCode +
        //         "&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=ELEMENTS&CENTER=500@10&format=" + formatType);

        // NOTE: Use the saved response data to avoid financial cost of running the node server on the web.
        const planetJsonResponseLocation = `response-data/horizons-${this.GetPlanetName(planetCode)}-response.json`;

        // return `${protocol}${hostName}${routePath}?apiUrl=${planetJsonResponseLocation}`;
        return `${protocol}${hostName}/${isInDevelopment ? "public/" : ""}${planetJsonResponseLocation}`;
    }

    GetPlanetName(planetCode) {
        if (planetCode === "199") {
            return "mercury";
        } else if (planetCode === "299") {
            return "venus";
        } else if (planetCode === "399") {
            return "earth";
        } else if (planetCode === "499") {
            return "mars";
        } else if (planetCode === "599") {
            return "jupiter";
        } else if (planetCode === "699") {
            return "saturn";
        } else if (planetCode === "799") {
            return "uranus";
        } else if (planetCode === "899") {
            return "neptune";
        } else if (planetCode === "999") {
            return "pluto";
        }
    }
}
