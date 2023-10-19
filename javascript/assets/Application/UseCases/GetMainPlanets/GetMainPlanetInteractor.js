import { HorizonsApiGateway } from "../../../infrastructure/gateways/horizons-gateway.js";

// TODO: Create mapping behaviour to better handle this
export class PlanetEphemerisDto {
  constructor(captureData, heliocentricData, physicalBodyData) {
    this.captureData = captureData;
    this.heliocentricData = heliocentricData;
    this.physicalBodyData = physicalBodyData;
  }
}

/**
 * The UseCase for getting a specified main planet.
 */
export class GetMainPlanetInteractor {
  constructor(serviceDependencies) {
    this.horizonsGateway = serviceDependencies.find(dependency => dependency.name == HorizonsApiGateway.name).service;
  }

  async Handle (inputPort, presenter) {
    const gatewayViewModel = await this.horizonsGateway.GetPlanetEphemerisData(inputPort.planetCode);

    if (gatewayViewModel.isSuccessful) {
      const captureData = this.ExtractCaptureData(gatewayViewModel.data.captureSection);
      const heliocentricData = this.ExtractHeliocentricData(gatewayViewModel.data.heliocentricSection);
      const physicalBodyData = this.ExtractPhysicalBodyData(gatewayViewModel.data.physicalBodySection);

      await presenter.PresentsPlanetDataAsync(new PlanetEphemerisDto(captureData, heliocentricData, physicalBodyData));
    }
    else {
      presenter.PresentsRequestFailureAsync(gatewayViewModel.error.statusText);
    }
  }

  /**
   * Extracts the time-related data from the capture section of the ephemeris data.
   * @param {*} captureSection Section containing the data.
   */
  ExtractCaptureData(captureSection) {
    var startDate = "";
    var endDate = "";

    captureSection.forEach(element => {
        if (element.includes("Start time")) {
          startDate = element;
        }

        else if (element.includes("Stop  time")) {
          endDate = element;
        }
    })

    const parseData = dateString => {
      const [dateKey, dateValue] = dateString.split(":").map(item => item.trim());
      return { key: dateKey, value: dateValue };
    }

    return {
      startDate: parseData(startDate),
      endDate: parseData(endDate)
    }
  }

  /**
   * Extracts the planet's orbital heliocentric information from the ephemeris data.
   * @param {*} heliocentricSection Section containing the data
   */
  ExtractHeliocentricData(heliocentricSection) {
    var heliocentricData = {
      eccentricity: "",
      meanAnomaly: "",
      semiMajorAxis: "",
    }

    // Process heliocentric data and set values in heliocentricData object
    if (heliocentricSection != undefined && heliocentricSection.length != 0) {
      for (const line of heliocentricSection) {
        const dataPoints = line.trim().match(/(\w+)\s*=\s*([\d.E+-]+)/g);
        if (dataPoints != null && dataPoints.length != 0) {
          dataPoints.forEach((dataPoint) => {
            const data = {
              key: dataPoint.split("=")[0].trim(),
              value: dataPoint.split("=")[1].trim()
            }

            if (data.key == "EC") {
              heliocentricData.eccentricity = data.value;
            }
            else if (data.key == "MA") {
              heliocentricData.meanAnomaly = data.value;
            }
            else if (data.key == "A") {
              heliocentricData.semiMajorAxis = data.value;
            }
          });
        }
      }
    }

    return heliocentricData;
  }

  /**
   * Extracts the physical information of the planet.
   * @param {*} physicalBodySection The section containing the data.
   */
  ExtractPhysicalBodyData(physicalBodySection) {
    const physicalBodyData = {
      obliquityToOrbit: "",
      orbitalSpeed: "",
      planetRadius: "",
      meanSolarDay: "",
    }

    for (const line of physicalBodySection) {
      if (line.trim().startsWith("*") || !line.includes("=")) {
          continue;
      }

      const dataPoints = line.match(/(.{1,40})/g);
      if (dataPoints != null && dataPoints.length != 0) {
        dataPoints.forEach((dataPoint) => {
          if (dataPoint.includes("=")) {
            const data = {
              key: dataPoint.split("=")[0].trim(),
              value: dataPoint.split("=")[1].trim()
            };

            // TODO: Create an options parameter in the future to contain the search options for the physical datapoints.
            physicalBodyData.meanSolarDay = physicalBodyData.meanSolarDay == "" ? this.GetPhysicalBodyValue(data, ["Mean solar day"]) : physicalBodyData.meanSolarDay;
            physicalBodyData.obliquityToOrbit = physicalBodyData.obliquityToOrbit == "" ? this.GetPhysicalBodyValue(data, ["Obliquity to orbit"]) : physicalBodyData.obliquityToOrbit;
            physicalBodyData.orbitalSpeed = physicalBodyData.orbitalSpeed == "" ? this.GetPhysicalBodyValue(data, ["Orbital speed", "Mean Orbit vel", "Orbit speed", "Mean orbit speed", "Mean orbit velocity"]) : physicalBodyData.orbitalSpeed;
            physicalBodyData.planetRadius = physicalBodyData.planetRadius == "" ? this.GetPhysicalBodyValue(data, ["vol. mean radius"]) : physicalBodyData.planetRadius;
          }
        });
      }
    }

    return physicalBodyData;
  }

  GetPhysicalBodyValue(dataPoint, keys) {
      for (const key of keys) {
          if (dataPoint.key.toLowerCase().includes(key.toLowerCase())) {
              return dataPoint.value;
          }
      }

      return "";
  }

}