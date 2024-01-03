class MathHelper {
    static ConvertDegreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    static ConvertKilometersToAstronomicalUnits(kilometers) {
        return kilometers / 1.496e+8;
    }

    static Lerp3D(start, end, percent) {
        return {
            x: this.Lerp(start.x, end.x, percent),
            y: this.Lerp(start.y, end.y, percent),
            z: this.Lerp(start.z, end.z, percent)
        };
    }

    static Lerp(start, end, percent) {
        return start * (1 - percent) + end * percent;
    }

    static Clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}

export {
    MathHelper
};
