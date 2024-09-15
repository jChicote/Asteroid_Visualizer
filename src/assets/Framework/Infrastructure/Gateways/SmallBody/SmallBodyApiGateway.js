import { ServiceExtractor } from "../../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
import { GatewayViewModel } from "../Common/GatewayViewModels.js";
import { isInDevelopment, hostName, protocol } from "../Configuration/gateway-options.js";
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
        // const asteroidsUri = this.sbdbApiUrl +
        //     encodeURIComponent(
        //         "fields=spkid,full_name,kind,neo,pha,e,a,q,i,om,w,ma,tp,per,n,ad,GM,diameter,pole,rot_per&" +
        //         "sb-kind=a&sb-class=IEO"); // objects retrieved are from Atira class asteroids

        // NOTE: Use the saved response data to avoid financial cost of running the node server on the web.
        const asteroidsJsonResponseLocation = "response-data/sbdbquery-asteroids-response.json";
        return await this.InvokeGatewayAsync(asteroidsJsonResponseLocation);
    }

    async GetCometsAsync() {
        // const cometsUri = this.sbdbApiUrl +
        //     encodeURIComponent(
        //         "fields=spkid,full_name,kind,e,a,q,i,om,w,ma,tp,per,n,ad,GM,diameter,pole,rot_per&" +
        //         "sb-kind=c&sb-class=HTC"); // objects retrieved are from Halley-type comets

        // NOTE: Use the saved response data to avoid financial cost of running the node server on the web.
        const cometsJsonResponseLocation = "response-data/sbdbquery-comets-response.json";
        return await this.InvokeGatewayAsync(cometsJsonResponseLocation);
    }

    async InvokeGatewayAsync(uri) {
        // const apiUrl = `${hostUrl}?apiUrl=${uri}`;
        const apiUrl = `${protocol}${hostName}/${isInDevelopment ? "public/" : ""}${uri}`;

        console.log(apiUrl);

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
