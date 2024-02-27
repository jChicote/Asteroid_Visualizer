import { Component } from "react";

class CelestialObjectMarker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            screenPosition: { x: 0, y: 0 }
        };
    }

    SetPosition(screenPosition) {
        this.setState({
            screenPosition
        });
    }

    render() {
        return (
            <div className="celestial-object-marker"></div>
        );
    }
}

export { CelestialObjectMarker };
