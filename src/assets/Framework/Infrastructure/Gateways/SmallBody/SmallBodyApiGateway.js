import { ServiceExtractor } from "../../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { GatewayViewModel } from "../Common/GatewayViewModels.js";
import { hostUrl } from "../Configuration/gateway-options.js";
import { SmallBodyResponseContainer } from "./SmallBodyApiGatewayMapperConfiguration.js";
import { SmallCelestialBodyViewModel } from "./SmallCelestialBodyViewModel.js";

class SmallBodyApiGateway {
    constructor(serviceDependencies) {
        this.gatewayClient = ServiceExtractor.ObtainService(serviceDependencies, "GatewayClient");
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, "ObjectMapper");
        this.serverUrlProvider = ServiceExtractor.ObtainService(serviceDependencies, "ProxyServerUrlProvider");

        this.sbdbApiUrl = "https://ssd-api.jpl.nasa.gov/sbdb_query.api?";
    }

    async GetAsteroidsAsync() {
        const asteroidsUri = this.sbdbApiUrl +
            encodeURIComponent(
                "fields=spkid,full_name,kind,neo,pha,e,a,q,i,om,w,ma,tp,per,n,ad,GM,diameter,pole,rot_per&" +
                "sb-kind=a&sb-class=IEO"); // objects retrieved are from Atira class asteroids

        return await this.InvokeGatewayAsync(asteroidsUri);
    }

    async GetCometsAsync() {
        const cometsUri = this.sbdbApiUrl +
            encodeURIComponent(
                "fields=spkid,full_name,kind,e,a,q,i,om,w,ma,tp,per,n,ad,GM,diameter,pole,rot_per&" +
                "sb-kind=c&sb-class=HTC"); // objects retrieved are from Halley-type comets

        return await this.InvokeGatewayAsync(cometsUri);
    }

    async InvokeGatewayAsync(uri) {
        const apiUrl = `${hostUrl}?apiUrl=${uri}`;

        console.log(window.location.host);

        const response = await this.gatewayClient.SendAsync(apiUrl);
        if (response.status === 200) {
            const contentData = Array.from(response.content.data);
            const smallCelestialBodies = [];

            for (const smallBody of contentData) {
                smallCelestialBodies.push(
                    this.mapper.Map(
                        new SmallBodyResponseContainer(this.ReassignContentDataKeys(response.content.fields, smallBody)),
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
