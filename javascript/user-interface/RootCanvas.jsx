import { Component } from "react";
import { ViewingOptionsGroup } from "./option-menu/ViewingOptionsGroup.jsx";

class RootCanvas extends Component {
    render() {
        return (
            <div id="root-canvas">
                <ViewingOptionsGroup />
            </div>
        );
    }
}

export { RootCanvas };
