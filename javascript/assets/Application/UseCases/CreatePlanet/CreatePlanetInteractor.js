import { Planet } from "../../../Domain/Entities/Planet.js";
import { PlanetRepository } from "../../../Domain/Repositories/PlanetRepository.js";
import { PlanetDto } from "../../Dtos/PlanetDto.js";

/**
 * The UseCase for getting a specified main planet.
 */
export class CreatePlanetInteractor {
    constructor(serviceDependencies) {
        this.planetRepository = serviceDependencies.find((dependency) => dependency.name === PlanetRepository.name).service;
    }

    async Handle(inputPort, presenter) {
        if (inputPort.capture === null) {
            presenter.PresentPlanetDataNotFoundAsync(inputPort.planetCode, "capture");
        } else if (inputPort.heliocentric === null) {
            presenter.PresentPlanetDataNotFoundAsync(inputPort.planetCode, "heliocentric");
        } else if (inputPort.physicalBody === null) {
            presenter.PresentPlanetDataNotFoundAsync(inputPort.planetCode, "physical body");
        }

        const captureData = await this.ExtractCaptureData(inputPort.capture);
        const heliocentricData = await this.ExtractHeliocentricData(inputPort.heliocentric);
        const physicalBodyData = await this.ExtractPhysicalBodyData(inputPort.physicalBody);

        const planet = new Planet(
            inputPort.planetCode,
            heliocentricData.eccentricity,
            heliocentricData.meanAnomaly,
            physicalBodyData.planetRadius,
            heliocentricData.semiMajorAxis);

        // Store planet domain entity
        await this.planetRepository.Add(planet);

        await presenter.PresentsPlanetDataAsync(new PlanetDto(captureData, heliocentricData, physicalBodyData));
    }

    /**
     * Extracts the time-related data from the capture section of the ephemeris data.
     * @param {*} captureSection Section containing the data.
     */
    async ExtractCaptureData(captureSection) {
        const captureData = {
            startDate: "",
            endDate: ""
        };

        const dateTimeRegex = /(\d{4})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{1,2})/;
        captureSection.forEach((element) => {
            if (element.includes("Start time")) {
                captureData.startDate = this.CreateDictionaryFromData(element, ":").value.match(dateTimeRegex)[0];
            } else if (element.includes("Stop  time")) {
                captureData.endDate = this.CreateDictionaryFromData(element, ":").value.match(dateTimeRegex)[0];
            }
        });

        return captureData;
    }

    /**
     * Extracts the planet"s orbital heliocentric information from the ephemeris data.
     * @param {*} heliocentricSection Section containing the data
     */
    async ExtractHeliocentricData(heliocentricSection) {
        const heliocentricData = {
            eccentricity: "",
            meanAnomaly: "",
            semiMajorAxis: ""
        };

        // Process heliocentric data and set values in heliocentricData object
        if (heliocentricSection !== undefined && heliocentricSection.length !== 0) {
            for (const line of heliocentricSection) {
                const dataPoints = line.trim().match(/(\w+)\s*=\s*([\d.E+-]+)/g);
                if (dataPoints != null && dataPoints.length !== 0) {
                    dataPoints.forEach((dataPoint) => {
                        const data = this.CreateDictionaryFromData(dataPoint);

                        if (data.key === "EC") {
                            heliocentricData.eccentricity = this.ParseValidFloat(data.value);
                        } else if (data.key === "MA") {
                            heliocentricData.meanAnomaly = this.ParseValidFloat(data.value);
                        } else if (data.key === "A") {
                            heliocentricData.semiMajorAxis = this.ParseValidFloat(data.value);
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
    async ExtractPhysicalBodyData(physicalBodySection) {
        const physicalBodyData = {
            obliquityToOrbit: "",
            orbitalSpeed: "",
            planetRadius: "",
            meanSolarDay: ""
        };

        for (const line of physicalBodySection) {
            if (line.trim().startsWith("*") || !line.includes("=")) {
                continue;
            }

            const dataPoints = line.match(/(.{1,40})/g);
            if (dataPoints != null && dataPoints.length !== 0) {
                dataPoints.forEach((dataPoint) => {
                    if (dataPoint.includes("=")) {
                        const data = this.CreateDictionaryFromData(dataPoint);

                        // TODO: Create an options parameter in the future to contain the search options for the physical datapoints.
                        physicalBodyData.meanSolarDay =
                            physicalBodyData.meanSolarDay === ""
                                ? this.ParseValidFloat(this.GetPhysicalBodyValue(data, ["Mean solar day"]))
                                : physicalBodyData.meanSolarDay;

                        physicalBodyData.obliquityToOrbit =
                            physicalBodyData.obliquityToOrbit === ""
                                ? this.ParseValidFloat(this.GetPhysicalBodyValue(data, ["Obliquity to orbit"]))
                                : physicalBodyData.obliquityToOrbit;

                        physicalBodyData.orbitalSpeed =
                            physicalBodyData.orbitalSpeed === ""
                                ? this.ParseValidFloat(this.GetPhysicalBodyValue(data, [
                                    "Orbital speed",
                                    "Mean Orbit vel",
                                    "Orbit speed",
                                    "Mean orbit speed",
                                    "Mean orbit velocity"
                                ]))
                                : physicalBodyData.orbitalSpeed;
                        physicalBodyData.planetRadius =
                            physicalBodyData.planetRadius === ""
                                ? this.ParseValidInt(this.GetPhysicalBodyValue(data, ["Vol. Mean Radius"]))
                                : physicalBodyData.planetRadius;
                    }
                });
            }
        }

        return physicalBodyData;
    }

    CreateDictionaryFromData(dataPoint, seperator = "=") {
        return {
            key: dataPoint.split(seperator)[0].trim(),
            value: dataPoint.split(seperator)[1].trim()
        };
    }

    ParseValidFloat(data) {
        if (data === "" || data === undefined) {
            return "";
        }

        return parseFloat(data);
    }

    ParseValidInt(data) {
        if (data === "" || data === undefined) {
            return "";
        }

        return parseInt(data);
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