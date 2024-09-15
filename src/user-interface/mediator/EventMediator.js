class EventMediator {
    constructor() {
        this.listeners = [];
    }

    Subscribe(eventName, listener) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }

        this.listeners[eventName].push(listener);
    }

    Notify(eventName, data) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(listener => listener(data));
        }
    }
}

export { EventMediator };
