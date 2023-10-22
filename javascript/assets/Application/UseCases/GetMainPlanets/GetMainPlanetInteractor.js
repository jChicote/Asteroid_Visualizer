import { GetMainPlanetDto } from "../../Dtos/GetMainPlanetDto.js";

/**
 * The UseCase for getting a specified main planet.
 */
export class GetMainPlanetInteractor {
    async Handle(inputPort, presenter) {
        if (inputPort.capture === null) {
            presenter.PresentPlanetDataNotFoundAsync(inputPort.planetCode, "capture");
        } else if (inputPort.heliocentric === null) {
            presenter.PresentPlanetDataNotFoundAsync(inputPort.planetCode, "heliocentric");
        } else if (inputPort.physicalBody === null) {
            presenter.PresentPlanetDataNotFoundAsync(inputPort.planetCode, "physical body");
        }

        const captureData = this.ExtractCaptureData(inputPort.capture);
        const heliocentricData = this.ExtractHeliocentricData(inputPort.heliocentric);
        const physicalBodyData = this.ExtractPhysicalBodyData(inputPort.physicalBody);

        await presenter.PresentsPlanetDataAsync(new GetMainPlanetDto(captureData, heliocentricData, physicalBodyData));
    }

    /**
     * Extracts the time-related data from the capture section of the ephemeris data.
     * @param {*} captureSection Section containing the data.
     */
    ExtractCaptureData(captureSection) {
        const captureData = {
            startDate: "",
            endDate: ""
        };

        const dateTimeRegex = /(\d{4})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{1,2})/;
        captureSection.forEach((element) => {
            if (element.includes("Start time")) {
                captureData.startDate = (element.split(":")[1].trim()).match(dateTimeRegex)[0];
            } else if (element.includes("Stop  time")) {
                captureData.endDate = (element.split(":")[1].trim()).match(dateTimeRegex)[0];
            }
        });

        return captureData;
    }

    /**
     * Extracts the planet"s orbital heliocentric information from the ephemeris data.
     * @param {*} heliocentricSection Section containing the data
     */
    ExtractHeliocentricData(heliocentricSection) {
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
                        const data = {
                            key: dataPoint.split("=")[0].trim(),
                            value: dataPoint.split("=")[1].trim()
                        };

                        if (data.key === "EC") {
                            heliocentricData.eccentricity = data.value;
                        } else if (data.key === "MA") {
                            heliocentricData.meanAnomaly = data.value;
                        } else if (data.key === "A") {
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
                        const data = {
                            key: dataPoint.split("=")[0].trim(),
                            value: dataPoint.split("=")[1].trim()
                        };

                        // TODO: Create an options parameter in the future to contain the search options for the physical datapoints.
                        physicalBodyData.meanSolarDay =
                            physicalBodyData.meanSolarDay === ""
                                ? this.GetPhysicalBodyValue(data, ["Mean solar day"])
                                : physicalBodyData.meanSolarDay;

                        physicalBodyData.obliquityToOrbit =
                            physicalBodyData.obliquityToOrbit === ""
                                ? this.GetPhysicalBodyValue(data, ["Obliquity to orbit"])
                                : physicalBodyData.obliquityToOrbit;

                        physicalBodyData.orbitalSpeed =
                            physicalBodyData.orbitalSpeed === ""
                                ? this.GetPhysicalBodyValue(data, [
                                    "Orbital speed",
                                    "Mean Orbit vel",
                                    "Orbit speed",
                                    "Mean orbit speed",
                                    "Mean orbit velocity"
                                ])
                                : physicalBodyData.orbitalSpeed;
                        physicalBodyData.planetRadius =
                            physicalBodyData.planetRadius === ""
                                ? this.GetPhysicalBodyValue(data, ["vol. mean radius"])
                                : physicalBodyData.planetRadius;
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
