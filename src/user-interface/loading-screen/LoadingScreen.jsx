import { Component } from "react";
import { LoadingBar } from "./LoadingBar";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer";
import { EventMediator } from "../mediator/EventMediator";

class LoadingScreen extends Component {
    constructor() {
        super();

        this.state = {
            isVisible: true
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    HideLoadingScreen() {
        this.setState({
            isVisible: false
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        const eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        eventMediator.Subscribe("StartGame", this.HideLoadingScreen.bind(this));
    }

    render() {
        const className = `loading-panel ${!this.state.isVisible ? "loading-panel-fade-out" : ""} dark-background-06`;
        return (
            <div id="loading-screen" className={className}>
                <LoadingBar />
            </div>
        );
    }
}

export { LoadingScreen };
