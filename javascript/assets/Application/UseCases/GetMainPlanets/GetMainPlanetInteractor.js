import { HorizonsApiGateway } from "../../../infrastructure/gateways/horizons-gateway";

class GetMainPlanetInteractor {
  constructor(serviceDependencies) {
    this.horizonsGatway = serviceDependencies.find(dependency => dependency.name == HorizonsApiGateway.name).service;
  }

  async Handle(inputPort, presenter) {
    const planetData = await gateway.GetPlanetEphemerisData(inputPort.planetCode);
    return planets;
  }
}