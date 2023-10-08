
class PlanetController {
    constructor(horizonsGateway) {
        this.horizonsGateway = horizonsGateway;
    }

    getMainPlanets(id) {
        this.planetService.getPlanet(id)
            .then(planet => {
                this.planet = planet;
            });
    }
}