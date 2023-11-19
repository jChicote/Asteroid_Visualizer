class AsteroidObserver {
    constructor() {
        this.observers = [];
    }

    Subscribe(eventName, observer) {
        if (!this.observers[eventName]) {
            this.observers[eventName] = [];
        }

        this.observers[eventName].push(observer);
    }

    Unsubscribe(eventName, observer) {
        if (this.observers[eventName]) {
            this.observers[eventName] = this.observers[eventName].filter(o => o !== observer);
        }
    }

    Dispatch(eventName, data) {
        if (this.observers[eventName]) {
            this.observers[eventName].forEach(observer => observer(data));
        }

        console.log("Is dispatched");
    }
}

export { AsteroidObserver };
