import { Component } from "react";
import { PropTypes } from "prop-types";

class CelestialObjectMarker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            screenPosition: props.position
        };
    }

    SetPosition(screenPosition) {
        this.setState({
            screenPosition
        });
    }

    render() {
        console.log(this.state.screenPosition.x, this.state.screenPosition.y);
        return (
            <div
                className="celestial-object-marker marker-shape-circle marker-skin"
                style= {{
                    top: `${this.state.screenPosition.y}px`,
                    left: `${this.state.screenPosition.x}px`
                }}
            />
        );
    }
}

CelestialObjectMarker.propTypes = {
    position: PropTypes.object.isRequired
};

export { CelestialObjectMarker };
