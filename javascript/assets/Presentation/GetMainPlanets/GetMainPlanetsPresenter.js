
export class GetMainPlanetsPresenter {
    constructor(testPresenterServices) {
        this.testPresenterService = testPresenterServices.find(dependency => dependency.name == TestPresenterService.name).service;
        this.testPresenterServiceB = testPresenterServices.find(dependency => dependency.name == TestPresenterServiceB.name).service;
    }

    async presentMainPlanetsAsync(planetData) {

    }

    async testMethodDependencyInjection() {
        console.log("This is a test method");
    }

    async testMethodDependencyInjection2() {
        this.testPresenterService.testMethodDependencyInjection();
    }

    async testMethodDependencyInjection3() {
        this.testPresenterServiceB.testMethodDependencyInjection();
    }
}

export class TestPresenterService {
    constructor() {

    }

    async testMethodDependencyInjection() {
        console.log("This is a test method within the test presenter service");
    }
}

export class TestPresenterServiceB {
    constructor() {

    }

    async testMethodDependencyInjection() {
        console.log("This is a test method within the 2nd test presenter service");
    }
}

// TODO: We need to move the services folder out
// TODO: Refactor the extraction logic from the gateway to the presenter
// TODO: We need a base presenter class for holding the result to be then used by the controller