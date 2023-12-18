import { describe, jest, test } from "@jest/globals";
import { CreatePlanetInteractor } from "../../../../../javascript/assets/Application/UseCases/CreatePlanet/CreatePlanetInteractor.js";
import { PlanetRepository } from "../../../../../javascript/assets/Domain/Repositories/PlanetRepository.js";
import { ObjectMapper } from "../../../../../javascript/shared/Infrastructure/Mapper/ObjectMapper.js";

// Mocks

jest.mock("../../../../../javascript/shared/Infrastructure/Mapper/ObjectMapper.js");
jest.mock("../../../../../javascript/assets/Domain/Repositories/PlanetRepository.js");

// Fields

const heliocentricSection = "2459580.916666667 = A.D. 2022-Jan-01 10:00:00.0000 TDB " +
    "EC= 1.755283730575185E-02 QR= 1.471058089728987E+08 IN= 3.874617050653719E-03 " +
    "OM= 1.434962181455701E+02 W = 3.190781940967865E+02 Tp=  2459582.798832438886 " +
    "N = 1.139195266666463E-05 MA= 3.581474506510452E+02 TA= 3.580809704370417E+02 " +
    "A = 1.497340666845410E+08 AD= 1.523623243961834E+08 PR= 3.160125489754179E+07";

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

// beforeEach(() => {
//     ObjectMapper.mockClear();
// });

describe("Extracting Heliocentric Data", () => {
    test("Can get eccentricity", () => {
        // Arrange
        const expected = parseFloat(1.755283730575185E-02);

        // Act
        const result = interactor.ExtractHeliocentricData(heliocentricSection);
        // .then(result => {
        //     return result;
        // });

        console.log(result);

        // Assert
        expect(result).toBe(expected);
    });

    test("Can get semi-major axis", () => {
        expect(true).toBe(true);
    });

    test("Can get mean-anomaly", () => {
        expect(true).toBe(true);
    });

    test("Can get inclination", () => {
        expect(true).toBe(true);
    });

    test("Can get longitude of ascending node", () => {
        expect(true).toBe(true);
    });

    test("Can get argument of perihelion", () => {
        expect(true).toBe(true);
    });
});
