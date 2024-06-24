import { ServiceExtractor } from "../../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
// import { ProxyServerUrlProvider } from "./ProxyServerUrlProvider.js";

export class HorizonsApiUriProvider {
    constructor(serviceDependencies) {
        this.serverUrlProvider = ServiceExtractor.ObtainService(serviceDependencies, "ProxyServerUrlProvider");
    }

    Provide(planetCode) {
        const contentType = "text";
        const encodedUri = encodeURIComponent("https://ssd.jpl.nasa.gov/api/horizons.api?" +
            "COMMAND=" + planetCode + "&OBJ_DATA=YES&MAKE_EPHEM=YES&EPHEM_TYPE=ELEMENTS&CENTER=500@10&format=" + contentType);

        return this.serverUrlProvider.Provide() + encodedUri;
    }
}
