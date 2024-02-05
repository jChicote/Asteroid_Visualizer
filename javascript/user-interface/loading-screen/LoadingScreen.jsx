import { Component } from "react";
import { LoadingBar } from "./LoadingBar";

class LoadingScreen extends Component {
    render() {
        return (
            <div className="background-panel dark-background-06">
                <LoadingBar />
            </div>
        );
    }
}

export { LoadingScreen };
