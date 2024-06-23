export class UseCaseMediator {
    constructor() {
        this.useCases = new Map();
    }

    /**
     * Registers the callback to the event.
     * @param {function} inputPortType - The input port constructor function.
     * @param {function} presenterType - The presenter constructor function.
     * @param {object} useCase - The use case instance.
     */
    RegisterUseCase(inputPortType, presenterType, useCase) {
        const key = "{" + inputPortType.name + "-{" + presenterType.name + "}";
        this.useCases.set(key, useCase);
    }

    /**
     * Invokes the use case subscribed to the event.
     * @param {object} inputPort - The input port instance.
     * @param {object} presenter - The presenter instance.
     * @throws {Error} If the use case for the given input port and presenter is not registered.
     */
    Invoke(inputPort, presenter) {
        const searchKey = "{" + inputPort.constructor.name + "-{" + presenter.constructor.name + "}";
        const usecase = this.useCases.get(searchKey);

        if (usecase == null) {
            throw new Error(`Usecase of ${searchKey} is not registered.`);
        }

        usecase.Handle(inputPort, presenter);
    }
}
