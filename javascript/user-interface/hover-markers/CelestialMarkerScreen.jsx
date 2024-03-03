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
        const testMarker1 = { id: 1, position: { x: 100, y: 100 } };
        const testMarker2 = { id: 2, position: { x: 200, y: 100 } };

        this.setState(prevState => ({
            markers: [...prevState.markers, testMarker1, testMarker2]
        }));
    }

    render() {
        console.log(1);
        return (
            <div className="fill-canvas">
                {this.state.markers.map(marker => (
                    <CelestialObjectMarker key={marker.id} position={marker.position}/>
                ))}
            </div>
        );
    }
}

export { CelestialMarkerScreen };
