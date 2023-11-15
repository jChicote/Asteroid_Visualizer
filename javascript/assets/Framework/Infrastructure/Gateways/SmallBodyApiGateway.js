import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { HTTPMethods } from './Configuration/gateway-options.js';
import { GatewayClient } from "./GatewayClient.js";
import { ProxyServerUrlProvider } from "./Providers/ProxyServerUrlProvider.js";

// TODO: Move the URL along with the content options into a configuration file for the application.
const ServerProxyURL = "http://localhost:8080/proxy?url=";

// TODO: Move this out to its own gateway
export async function GetSmallBodyAsteroids() {
    const apiUri = ServerProxyURL + "https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=Eros";

    await SendAsync(HTTPMethods.GET, apiUri, true);
}

export class SmallBodyApiGateway {
    constructor(serviceDependencies) {
        this.gatewayClient = ServiceExtractor.ObtainService(serviceDependencies, GatewayClient);
        this.serverUrlProvider = ServiceExtractor.ObtainService(serviceDependencies, ProxyServerUrlProvider);
    }

    async GetAsteroids() {
        const apiUrl = this.serverUrlProvider.Provide() + "";

        const response = this.GatewayClient.SendAsync(HTTPMethods.GET, apiUrl, true);

        if (response.status === 200) {

        } else if (response.status === 400) {

        } else {

        }

    }

    async GetComets() {

    }
}
