import { Component } from "react";
import { EventMediator } from "./mediator/EventMediator.js";
import { OptionsMenuGroup } from "./option-menu/OptionsMenuGroup.jsx";
import { SolarSystemVisualizer } from "../SolarSystemVisualizer.js";
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
            <div id="root-canvas" className={canvasClassName}>
                <ViewingOptionsGroup />
                <OptionsMenuGroup />
            </div>
        );
    }
}

export { RootCanvas };
