import { ServiceExtractor } from "../../../../shared/DependencyInjectionServices/Utilities/ServiceExtractor.js";
// import { ObjectMapper } from "../../../../shared/Infrastructure/Mapper/ObjectMapper.js";
import { Planet } from "../../../Domain/Entities/Planet.js";
// import { PlanetRepository } from "../../../Domain/Repositories/PlanetRepository.js";
import { PlanetDto } from "../../Dtos/PlanetDto.js";
import { CreatePlanetDataContainer } from "./CreatePlanetMapperConfiguration.js";

/**
 * The UseCase for getting a specified main planet.
 */
export class CreatePlanetInteractor {
    constructor(serviceDependencies) {
        this.mapper = ServiceExtractor.ObtainService(serviceDependencies, "ObjectMapper");
        this.planetRepository = ServiceExtractor.ObtainService(serviceDependencies, "PlanetRepository");
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
        const physicalBodyData = await this.ExtractPhysicalBodyData(inputPort.planetCode, inputPort.physicalBody);

        const dataContainer = new CreatePlanetDataContainer(captureData, heliocentricData, inputPort, physicalBodyData);
        const planet = this.mapper.Map(dataContainer, Planet);

        // Store planet domain entity
        await this.planetRepository.Add(planet);

        await presenter.PresentsPlanetDataAsync(this.mapper.Map(planet, PlanetDto));
    }

    /**
     * Extracts the time-related data from the capture section of the ephemeris data.
     * @param {*} captureSection Section containing the data.
     */
    async ExtractCaptureData(captureSection) {
        const captureData = {
            startDate: "",
            endDate: "",
            name: ""
        };

        const dateTimeRegex = /(\d{4})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{1,2})/;
        captureSection.forEach((element) => {
            if (element.includes("Start time")) {
                captureData.startDate = this.CreateDictionaryFromData(element, ":").value.match(dateTimeRegex)[0];
            } else if (element.includes("Stop  time")) {
                captureData.endDate = this.CreateDictionaryFromData(element, ":").value.match(dateTimeRegex)[0];
            } else if (element.includes("Target body name")) {
                captureData.name = this.CreateDictionaryFromData(element, ":").value.split(" ")[0].trim();
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
            argumentOfPerihelion: "",
            eccentricity: "",
            inclination: "",
            longitudeOfAscendingNode: "",
            meanAnomaly: "",
            meanMotion: "",
            perihelionDistance: "",
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
                        } else if (data.key === "IN") {
                            heliocentricData.inclination = this.ParseValidFloat(data.value);
                        } else if (data.key === "OM") {
                            heliocentricData.longitudeOfAscendingNode = this.ParseValidFloat(data.value);
                        } else if (data.key === "W") {
                            heliocentricData.argumentOfPerihelion = this.ParseValidFloat(data.value);
                        } else if (data.key === "QR") {
                            heliocentricData.perihelionDistance = this.ParseValidFloat(data.value);
                        } else if (data.key === "N") {
                            const originalMeanMotion = this.ParseValidFloat(data.value);
                            heliocentricData.meanMotion = originalMeanMotion * 86400; // Converts from degrees per second to degrees per day
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
    async ExtractPhysicalBodyData(planetCode, physicalBodySection) {
        const physicalBodyData = {
            obliquityToOrbit: "",
            orbitalSpeed: "",
            planetRadius: "",
            meanSolarDay: "",
            sideRealDayPeriod: ""
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

                        physicalBodyData.meanSolarDay =
                            physicalBodyData.meanSolarDay === ""
                                ? this.ParseValidFloat(this.GetPhysicalBodyValue(data, [{ key: "Mean solar day", searchUnitOfMeasure: false }]))
                                : physicalBodyData.meanSolarDay;

                        physicalBodyData.obliquityToOrbit =
                            physicalBodyData.obliquityToOrbit === ""
                                ? this.ParseValidFloat(this.GetPhysicalBodyValue(data, [{ key: "Obliquity to orbit", searchUnitOfMeasure: false }]))
                                : physicalBodyData.obliquityToOrbit;

                        physicalBodyData.orbitalSpeed =
                            physicalBodyData.orbitalSpeed === ""
                                ? this.ParseValidFloat(this.GetPhysicalBodyValue(data, [
                                    { key: "Orbital speed", searchUnitOfMeasure: false },
                                    { key: "Mean Orbit vel", searchUnitOfMeasure: false },
                                    { key: "Orbit speed", searchUnitOfMeasure: false },
                                    { key: "Mean orbit speed", searchUnitOfMeasure: false },
                                    { key: "Mean orbit velocity", searchUnitOfMeasure: false }
                                ]))
                                : physicalBodyData.orbitalSpeed;
                        physicalBodyData.planetRadius =
                            physicalBodyData.planetRadius === ""
                                ? this.ParseValidInt(this.GetPhysicalBodyValue(data, [{ key: "Vol. Mean Radius", searchUnitOfMeasure: false }]))
                                : physicalBodyData.planetRadius;
                        physicalBodyData.sideRealDayPeriod =
                            physicalBodyData.sideRealDayPeriod === ""
                                ? this.ParseValidFloat(this.GetPhysicalBodyValue(data, [
                                    { key: "Sidereal orb. per.", searchUnitOfMeasure: true },
                                    { key: "Mean sidereal orb per", searchUnitOfMeasure: true },
                                    { key: "Sidereal orb. per., d", searchUnitOfMeasure: false },
                                    { key: "Sidereal orb period", searchUnitOfMeasure: true },
                                    { key: "Sidereal orbit period", searchUnitOfMeasure: true }
                                ], "d"))
                                : physicalBodyData.sideRealDayPeriod;

                        // TODO: In the future make the extraction of the values rules based. This is so that they can be flexible for the requirements of each planet.
                        // Extract and translate certain items of data from
                        if (planetCode === "999") {
                            const sideRealOrbitPeriod = this.ParseValidFloat(this.GetPhysicalBodyValue(data, [{ key: "Sidereal orbit period", searchUnitOfMeasure: false }]));
                            physicalBodyData.sideRealDayPeriod =
                                physicalBodyData.sideRealDayPeriod === "" || physicalBodyData.sideRealDayPeriod === 0
                                    ? sideRealOrbitPeriod * 365.25
                                    : physicalBodyData.sideRealDayPeriod;
                        }
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

    GetPhysicalBodyValue(dataPoint, searchQuery, unitOfMeasurement = "") {
        for (const query of searchQuery) {
            if (dataPoint.key.toLowerCase().includes(query.key.toLowerCase())) {
                if (query.searchUnitOfMeasure === false) {
                    return dataPoint.value;
                } else if (query.searchUnitOfMeasure === true && dataPoint.value.includes(unitOfMeasurement)) {
                    return dataPoint.value;
                }
            }
        }

        return "";
    }
}
