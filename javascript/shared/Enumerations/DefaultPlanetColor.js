export class DefaultPlanetColor {
    static Mercury = new DefaultPlanetColor(0xC7C7C7);
    static Venus = new DefaultPlanetColor(0xFFC7C7);
    static Earth = new DefaultPlanetColor(0x0000FF);
    static Mars = new DefaultPlanetColor(0xFF0000);
    static Jupiter = new DefaultPlanetColor(0xFFC7C7);
    static Saturn = new DefaultPlanetColor(0xFFC7C7);
    static Uranus = new DefaultPlanetColor(0x4FD0E7);
    static Neptune = new DefaultPlanetColor(0x4b70dd);
    static Pluto = new DefaultPlanetColor(0xFFC7C7);

    constructor(hexCode) {
        this.hexCode = hexCode;
    }
}
