export class Mediator {
    constructor() {
        this.events = {};
    }

    /**
     * Registers the callback to the event.
     */
    Subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(callback);
    }

    /**
     * Invokes the use case subscribed to the event.
     * @param {*} event Description of the event to invoke.
     * @param {*} useCaseParameters The parameters used to invoke the use case.
     */
    Invoke(event, useCaseParameters) {
        if (!this.events[event]) {
            throw new Error(`Event ${event} is not registered.`);
        }

        this.events[event].forEach(callback => callback(useCaseParameters));
    }
}
