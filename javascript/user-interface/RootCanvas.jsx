import { Component } from "react";
import { OptionsMenuGroup } from "./option-menu/OptionsMenuGroup.jsx";
import { ViewingOptionsGroup } from "./option-menu/ViewingOptionsGroup.jsx";

class RootCanvas extends Component {
    render() {
        return (
            <div id="root-canvas">
                <ViewingOptionsGroup />
                <OptionsMenuGroup />
            </div>
        );
    }
}

export { RootCanvas };
