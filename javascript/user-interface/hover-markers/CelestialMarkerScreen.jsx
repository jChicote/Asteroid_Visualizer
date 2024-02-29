import { Component } from "react";
import { CelestialObjectMarker } from "./CelestialHoverMarker.jsx";

class CelestialMarkerScreen extends Component {
    constructor() {
        super();

        this.state = {
            markers: []
        };
    }

    componentDidMount() {
        const testMarker1 = new CelestialObjectMarker();
        const testMarker2 = new CelestialObjectMarker();

        this.setState(prevState => ({
            markers: [...prevState.markers, testMarker1, testMarker2]
        }));
    }

    CreateMarkers() {
        return this.state.markers.map(marker => (
            <div
                key={marker.id}
                style={{
                    position: "absolute",
                    top: `${20}%`,
                    left: `${20}%`,
                    width: "20px",
                    height: "20px",
                    backgroundColor: "red"
                }}
                onMouseOver={() => this.handleMouseOver(marker.id)}
            />
        ));
    }

    render() {
        return (
            <div className="fill-canvas">
                {this.CreateMarkers()}
            </div>
        );
    }
}

export { CelestialMarkerScreen };
