export class DefaultPlanetColor {
    static Mercury = new DefaultPlanetColor("199", 0xC7C7C7);
    static Venus = new DefaultPlanetColor("299", 0xFFC7C7);
    static Earth = new DefaultPlanetColor("399", 0x0000FF);
    static Mars = new DefaultPlanetColor("499", 0xFF0000);
    static Jupiter = new DefaultPlanetColor("599", 0xFFC7C7);
    static Saturn = new DefaultPlanetColor("699", 0xFFC7C7);
    static Uranus = new DefaultPlanetColor("799", 0x4FD0E7);
    static Neptune = new DefaultPlanetColor("899", 0x4b70dd);
    static Pluto = new DefaultPlanetColor("999", 0xFFC7C7);

    constructor(code, hexCode) {
        this.code = code;
        this.hexCode = hexCode;
    }

    static GetColorByIdentifier(planetCode) {
        switch (planetCode) {
            case DefaultPlanetColor.Mercury.code:
                return DefaultPlanetColor.Mercury.hexCode;
            case DefaultPlanetColor.Venus.code:
                return DefaultPlanetColor.Venus.hexCode;
            case DefaultPlanetColor.Earth.code:
                return DefaultPlanetColor.Earth.hexCode;
            case DefaultPlanetColor.Mars.code:
                return DefaultPlanetColor.Mars.hexCode;
            case DefaultPlanetColor.Jupiter.code:
                return DefaultPlanetColor.Jupiter.hexCode;
            case DefaultPlanetColor.Saturn.code:
                return DefaultPlanetColor.Saturn.hexCode;
            case DefaultPlanetColor.Uranus.code:
                return DefaultPlanetColor.Uranus.hexCode;
            case DefaultPlanetColor.Neptune.code:
                return DefaultPlanetColor.Neptune.hexCode;
            case DefaultPlanetColor.Pluto.code:
                return DefaultPlanetColor.Pluto.hexCode;
            default:
                return 0x000000;
        }
    }
}
