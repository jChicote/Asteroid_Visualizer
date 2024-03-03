import { CelestialMarkerScreen } from "./hover-markers/CelestialMarkerScreen.jsx";
import { Component } from "react";
import { EventMediator } from "./mediator/EventMediator.js";
import { LoadingScreen } from "./loading-screen/LoadingScreen.jsx";
import { OptionsMenuGroup } from "./option-menu/OptionsMenuGroup.jsx";
import { SolarSystemVisualizer } from "../SolarSystemVisualizer.js";
import { TimeControlScreen } from "./time-control/TimeControlScreen.jsx";
import { ViewingOptionsGroup } from "./option-menu/ViewingOptionsGroup.jsx";

class RootCanvas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isMenuVisible: false
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handling                               */
    /* -------------------------------------------------------------------------- */

    ToggleFullscreen() {
        this.setState((prevState) => ({
            isMenuVisible: !prevState.isMenuVisible
        }));
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleMenuVisibility", this.ToggleFullscreen.bind(this));
    }

    render() {
        const canvasClassName = `canvas ${this.state.isMenuVisible ? "fullscreen" : ""}`;

        return (
            <div id="fullScreenCanvas" className="fullscreen">
                <div id="root-canvas" className={canvasClassName}>
                    <LoadingScreen />
                    <ViewingOptionsGroup />
                    <OptionsMenuGroup />
                    <TimeControlScreen />
                </div>
                <CelestialMarkerScreen />
            </div>
        );
    }
}

export { RootCanvas };
