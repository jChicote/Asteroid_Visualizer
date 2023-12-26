class MathHelper {
    static ConvertDegreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    static ConvertKilometersToAstronomicalUnits(kilometers) {
        return kilometers / 1.496e+8;
    }
}

export {
    MathHelper
};
