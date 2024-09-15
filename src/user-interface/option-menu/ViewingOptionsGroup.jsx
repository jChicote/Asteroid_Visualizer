import { Component } from "react";
import { MenuVisibilityButton } from "./MenuVisibilityButton.jsx";

class ViewingOptionsGroup extends Component {
    render() {
        return (
            <div id="view-options">
                <MenuVisibilityButton />
            </div>
        );
    }
}

export { ViewingOptionsGroup };
