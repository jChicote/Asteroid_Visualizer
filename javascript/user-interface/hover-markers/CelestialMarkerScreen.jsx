import { Component } from "react";
import { CelestialObjectMarker } from "./CelestialHoverMarker.jsx";

class CelestialMarkerScreen extends Component {
    CreateMarkers() {
        var testMap = new Map();
        testMap.set("Sun", CelestialObjectMarker);

        return (

        )
    }

    render() {
        return (
            <div className="fill-canvas">
                {CreateMarkers()}
            </div>
        );
    }
}

export { CelestialMarkerScreen };
