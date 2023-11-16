import { ServiceExtractor } from "../../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { ObjectMapper } from "../../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { GatewayViewModel } from '../Common/GatewayViewModels.js';
import { HTTPMethods, textContentOptions } from "../Configuration/gateway-options.js";
import { GatewayClient } from "../GatewayClient.js";
import { ProxyServerUrlProvider } from "../Providers/ProxyServerUrlProvider.js";
import { SmallBodyResponseContainer } from "./SmallBodyApiGatewayMapperConfiguration.js";
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
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);

        this.sbdbApiUrl = "https://ssd-api.jpl.nasa.gov/sbdb_query.api?";
    }

    async GetAsteroids() {
        const apiUrl = this.serverUrlProvider.Provide() + encodeURIComponent(this.sbdbApiUrl +
            "fields=spkid,full_name,kind,e,a,q,i,om,w,ma,tp,per,n,ad,GM,diameter,pole,rot_per&" +
            "sb-kind=a&sb-class=IEO"); // objects retrieved are from Atira class asteroids

        const response = await this.gatewayClient.SendAsync(HTTPMethods.GET, apiUrl, textContentOptions, true);

        if (response.status === 200) {
            const content = JSON.parse(response.content);
            const contentData = Array.from(content.data);
            const smallCelestialBodies = [];

            for (const smallBody of contentData) {
                const keyValueObject = {};

                // TODO: Move this to be processed elsewhere
                for (const key in content.fields) {
                    if (Object.prototype.hasOwnProperty.call(smallBody, key)) {
                        keyValueObject[content.fields[key]] = smallBody[key];
                    }
                }

                smallCelestialBodies.push(this.mapper.Map(new SmallBodyResponseContainer(keyValueObject), SmallCelestialBodyViewModel));
            }
            console.log(smallCelestialBodies);

            return new GatewayViewModel(true, smallCelestialBodies, null);
        } else {
            return new GatewayViewModel(false, null, response);
        }
    }

    async GetComets() {
        const apiUrl = this.serverUrlProvider.Provide() + encodeURIComponent(this.sbdbApiUrl +
            "fields=spkid,full_name,kind,e,a,q,i,om,w,ma,tp,per,n,ad,GM,diameter,pole,rot_per&" +
            "sb-kind=c&sb-class=HTC"); // objects retrieved are from Halley-type comets

        const response = await this.gatewayClient.SendAsync(HTTPMethods.GET, apiUrl, textContentOptions, true);

        if (response.status === 200) {
            const content = JSON.parse(response.content);
            const contentData = Array.from(content.data);
            const smallCelestialBodies = [];

            for (const smallBody of contentData) {
                const keyValueObject = {};

                // TODO: Move this to be processed elsewhere
                for (const key in content.fields) {
                    if (Object.prototype.hasOwnProperty.call(smallBody, key)) {
                        keyValueObject[content.fields[key]] = smallBody[key];
                    }
                }

                smallCelestialBodies.push(this.mapper.Map(new SmallBodyResponseContainer(keyValueObject), SmallCelestialBodyViewModel));
            }
            console.log(smallCelestialBodies);

            return new GatewayViewModel(true, smallCelestialBodies, null);
        } else {
            return new GatewayViewModel(false, null, response);
        }
    }
}
