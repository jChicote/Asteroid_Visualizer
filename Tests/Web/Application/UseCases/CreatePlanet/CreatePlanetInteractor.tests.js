import { describe, test } from "@jest/globals";
import { CreatePlanetInteractor } from "../../../../../src/assets/Application/UseCases/CreatePlanet/CreatePlanetInteractor.js";
import { PlanetRepository } from "../../../../../src/assets/Domain/Repositories/PlanetRepository.js";
import { ObjectMapper } from "../../../../../src/shared/Infrastructure/Mapper/ObjectMapper.js";

// Fields

const heliocentricSection = [
    "2459580.916666667 = A.D. 2022-Jan-01 10:00:00.0000 TDB ",
    "EC= 1.755283730575185E-02 QR= 1.471058089728987E+08 IN= 3.874617050653719E-03",
    "OM= 1.434962181455701E+02 W = 3.190781940967865E+02 Tp=  2459582.798832438886",
    "N = 1.139195266666463E-05 MA= 3.581474506510452E+02 TA= 3.580809704370417E+02 ",
    "A = 1.497340666845410E+08 AD= 1.523623243961834E+08 PR= 3.160125489754179E+07"
];

const mockServiceDependencies = [
    {
        name: "ObjectMapper",
        service: new ObjectMapper()
    },
    {
        name: "PlanetRepository",
        service: new PlanetRepository()
    }
];

const interactor = new CreatePlanetInteractor(mockServiceDependencies);

describe("Extracting Heliocentric Data", () => {
    test("Can get eccentricity", async () => {
        // Arrange
        const expected = parseFloat(1.755283730575185E-02);

        // Act
        const result = await interactor.ExtractHeliocentricData(heliocentricSection);

        // Assert
        expect(result.eccentricity).toBe(expected);
    });

    test("Can get semi-major axis", async () => {
        // Arrange
        const expected = parseFloat(1.497340666845410E+08);

        // Act
        const result = await interactor.ExtractHeliocentricData(heliocentricSection);

        // Assert
        expect(result.semiMajorAxis).toBe(expected);
    });

    test("Can get mean-anomaly", async () => {
        // Arrange
        const expected = parseFloat(3.581474506510452E+02);

        // Act
        const result = await interactor.ExtractHeliocentricData(heliocentricSection);

        // Assert
        expect(result.meanAnomaly).toBe(expected);
    });

    test("Can get inclination", async () => {
        // Arrange
        const expected = parseFloat(3.874617050653719E-03);

        // Act
        const result = await interactor.ExtractHeliocentricData(heliocentricSection);

        // Assert
        expect(result.inclination).toBe(expected);
    });

    test("Can get longitude of ascending node", async () => {
        // Arrange
        const expected = parseFloat(1.434962181455701E+02);

        // Act
        const result = await interactor.ExtractHeliocentricData(heliocentricSection);

        // Assert
        expect(result.longitudeOfAscendingNode).toBe(expected);
    });

    test("Can get argument of perihelion", async () => {
        // Arrange
        const expected = parseFloat(3.190781940967865E+02);

        // Act
        const result = await interactor.ExtractHeliocentricData(heliocentricSection);

        // Assert
        expect(result.argumentOfPerihelion).toBe(expected);
    });
});
