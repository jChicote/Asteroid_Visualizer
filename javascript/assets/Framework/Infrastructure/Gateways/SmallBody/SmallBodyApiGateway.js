import { ServiceExtractor } from "../../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { HTTPMethods, textContentOptions } from "../Configuration/gateway-options.js";
import { GatewayClient } from "../GatewayClient.js";
import { ProxyServerUrlProvider } from "../Providers/ProxyServerUrlProvider.js";
import { SmallBodyApiGatewayMapperConfiguration, SmallBodyResponseContainer } from "./SmallBodyApiGatewayMapperConfiguration.js";
import { SmallCelestialBodyViewModel } from "./SmallCelestialBodyViewModel.js";

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
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, SmallBodyApiGatewayMapperConfiguration);

        this.sbdbApiUrl = "https://ssd-api.jpl.nasa.gov/sbdb_query.api?";
    }

    async GetAsteroids() {
        const apiUrl = this.serverUrlProvider.Provide() + encodeURIComponent(this.sbdbApiUrl + "fields=spkid,full_name,kind,e,a,q,i,om,w,ma,tp,per,n,ad,GM,diameter,pole,rot_per&sb-kind=a&sb-class=IEO");

        const response = await this.gatewayClient.SendAsync(HTTPMethods.GET, apiUrl, textContentOptions, true);

        if (response.status === 200) {
            const content = JSON.parse(response.content);
            const contentData = Array.from(content.data);

            for (const smallBody of contentData) {
                const keyValueObject = {};

                for (const key in content.fields) {
                    if (Object.prototype.hasOwnProperty.call(smallBody, key)) {
                        keyValueObject[content.fields[key]] = smallBody[key];
                    }
                }

                const finalObject = this.mapper.Map(new SmallBodyResponseContainer(keyValueObject), SmallCelestialBodyViewModel);
                console.log(finalObject);
            }
            // } else if (response.status === 400) {

            // } else {

            // }
        }
    }

    async GetComets() {

    }
}
