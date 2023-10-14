
export class GetMainPlanetsPresenter {
    constructor(testPresenterService) {
        this.testPresenterService = testPresenterService;
    }

    async presentMainPlanetsAsync(planetData) {

    }

    async testMethodDependencyInjection() {
        console.log("This is a test method");
    }
}

export class TestPresenterService {
    constructor() {

    }

    async testMethodDependencyInjection() {
        console.log("This is a test method within the test presenter service");
    }
}

// TODO: We need to move the services folder out
// TODO: Refactor the extraction logic from the gateway to the presenter
// TODO: We need a base presenter class for holding the result to be then used by the controller