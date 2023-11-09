export class PlanetCodes {
    static Mercury = new PlanetCodes("Mercury", "199");
    static Venus = new PlanetCodes("Venus", "299");
    static Earth = new PlanetCodes("Earth", "399");
    static Mars = new PlanetCodes("Mars", "499");
    static Jupiter = new PlanetCodes("Jupiter", "599");
    static Saturn = new PlanetCodes("Saturn", "699");
    static Uranus = new PlanetCodes("Uranus", "799");
    static Neptune = new PlanetCodes("Neptune", "899");
    static Pluto = new PlanetCodes("Pluto", "999");

    constructor(name, code) {
        this.name = name;
        this.code = code;
    }
}
