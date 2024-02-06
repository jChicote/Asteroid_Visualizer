import { Component } from "react";

class LoadingBar extends Component {
    constructor() {
        super();

        this.state = {
            progress: 0
        };
    }

    UpdateBarFill() {
        const fill = document.getElementById("loading-bar-progress");
        fill.style.width = `${this.state.progress}%`;
    }

    render() {
        return (
            <div className="loading-bar-shape loading-bar-background">
                <div id="loading-bar-progress" className="loading-bar-fill-shape loading-bar-fill"></div>
            </div>
        );
    }
}

export { LoadingBar };
