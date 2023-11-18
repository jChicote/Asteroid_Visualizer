import { GatewayClient } from "../GatewayClient.js";
import { GatewayViewModel } from "../Common/GatewayViewModels.js";
import { HTTPMethods, textContentOptions } from "../Configuration/gateway-options.js";
import { ObjectMapper } from "../../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { ProxyServerUrlProvider } from "../Providers/ProxyServerUrlProvider.js";
import { ServiceExtractor } from "../../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { SmallBodyResponseContainer } from "./SmallBodyApiGatewayMapperConfiguration.js";
import { SmallCelestialBodyViewModel } from "./SmallCelestialBodyViewModel.js";

class SmallBodyApiGateway {
    constructor(serviceDependencies) {
        this.gatewayClient = ServiceExtractor.ObtainService(serviceDependencies, GatewayClient);
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, ObjectMapper);
        this.serverUrlProvider = ServiceExtractor.ObtainService(serviceDependencies, ProxyServerUrlProvider);

        this.sbdbApiUrl = "https://ssd-api.jpl.nasa.gov/sbdb_query.api?";
    }

    async GetAsteroidsAsync() {
        const asteroidsUri = this.serverUrlProvider.Provide() + encodeURIComponent(this.sbdbApiUrl +
            "fields=spkid,full_name,kind,e,a,q,i,om,w,ma,tp,per,n,ad,GM,diameter,pole,rot_per&" +
            "sb-kind=a&sb-class=IEO"); // objects retrieved are from Atira class asteroids

        return await this.InvokeGatewayAsync(asteroidsUri);
    }

    async GetCometsAsync() {
        const cometsUri = this.serverUrlProvider.Provide() + encodeURIComponent(this.sbdbApiUrl +
            "fields=spkid,full_name,kind,e,a,q,i,om,w,ma,tp,per,n,ad,GM,diameter,pole,rot_per&" +
            "sb-kind=c&sb-class=HTC"); // objects retrieved are from Halley-type comets

        return await this.InvokeGatewayAsync(cometsUri);
    }

    async InvokeGatewayAsync(uri) {
        const response = await this.gatewayClient.SendAsync(HTTPMethods.GET, uri, textContentOptions, true);

        if (response.status === 200) {
            const content = JSON.parse(response.content);
            const contentData = Array.from(content.data);
            const smallCelestialBodies = [];

            for (const smallBody of contentData) {
                smallCelestialBodies.push(
                    this.mapper.Map(
                        new SmallBodyResponseContainer(this.ReassignContentDataKeys(content.fields, smallBody)),
                        SmallCelestialBodyViewModel));
            }

            return new GatewayViewModel(true, smallCelestialBodies, null);
        } else {
            return new GatewayViewModel(false, null, response);
        }
    }

    ReassignContentDataKeys(fields, contentData) {
        const keyValueObject = {};

        for (const key in fields) {
            if (Object.prototype.hasOwnProperty.call(contentData, key)) {
                keyValueObject[fields[key]] = contentData[key];
            }
        }

        return keyValueObject;
    }
}

export { SmallBodyApiGateway };
