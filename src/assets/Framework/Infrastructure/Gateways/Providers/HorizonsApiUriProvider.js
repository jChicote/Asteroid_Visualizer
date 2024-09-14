import { ServiceExtractor } from "../../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { hostUrl } from "../Configuration/gateway-options.js";

export class HorizonsApiUriProvider {
    constructor(serviceDependencies) {
        this.serverUrlProvider = ServiceExtractor.ObtainService(serviceDependencies, "ProxyServerUrlProvider");
    }

    Provide(planetCode) {
        const formatType = "json"; // Format to json as the GatewayClient decodes the content

        // Encode the URI to properly and safely transmit the data
        const encodedUri =
            encodeURIComponent("https://ssd.jpl.nasa.gov/api/horizons.api?" +
                "COMMAND=" + planetCode +
                "&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=ELEMENTS&CENTER=500@10&format=" + formatType);

        return `${hostUrl}?apiUrl=${encodedUri}`;
    }
}
