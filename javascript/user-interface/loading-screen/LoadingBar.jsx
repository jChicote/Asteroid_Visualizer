import { Component } from "react";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer";
import { EventMediator } from "../mediator/EventMediator";

class LoadingBar extends Component {
    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    UpdateBarFill(progress) {
        const fill = document.getElementById("loading-bar-progress");
        fill.style.width = `${progress}%`;
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("UpdateLoadingBar", this.UpdateBarFill.bind(this));
        console.log("event subscribed");
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
