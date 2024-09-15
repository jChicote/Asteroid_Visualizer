import { Component } from "react";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { EventMediator } from "../mediator/EventMediator.js";
import { CelestialObjectMarker } from "./CelestialHoverMarker.jsx";

class CelestialMarkerScreen extends Component {
    constructor() {
        super();

        this.parentCanvasDelegate = new ParentCanvasDelegate();
        this.parentCanvasDelegate.GetCanvasDimensions = this.GetCanvasDimensions.bind(this);

        this.state = {
            markers: []
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */
    componentDidMount() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("CreateHoverMarker", this.ConstructHoverMarker.bind(this));
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    ConstructHoverMarker(markerDetails) {
        const newMarker = { id: markerDetails.id, position: markerDetails.position, delegate: markerDetails.delegate };

        this.setState(prevState => ({
            markers: [...prevState.markers, newMarker]
        }));
    }

    GetCanvasDimensions() {
        // This returns back the canvas dimensions of the root element.
        // THIS IS NOT IDEAL AS WE ARE GETTING THE DIMENSIONS AT RUNTIME
        return document.getElementById("markerCanvas").getBoundingClientRect();
    }

    /* -------------------------------------------------------------------------- */
    /*                                    View                                    */
    /* -------------------------------------------------------------------------- */

    CreateHoverMarker(marker) {
        console.log(marker.delegate.GetType());
        if (marker.delegate.GetType() === "Planet") {
            return (<CelestialObjectMarker
                key={marker.id}
                id={marker.id}
                position={marker.position}
                celestialObjectDelegate={marker.delegate}
                parentCanvasDelegate={this.parentCanvasDelegate}
                color={"#449ADC"} />);
        } else if (marker.delegate.GetType() === "Star") {
            return (<CelestialObjectMarker
                key={marker.id}
                id={marker.id}
                position={marker.position}
                celestialObjectDelegate={marker.delegate}
                parentCanvasDelegate={this.parentCanvasDelegate}
                color={"#f5cb42"} />);
        }
    }

    render() {
        return (
            <div id="markerCanvas" className="fill-canvas">
                {this.state.markers.map(marker => this.CreateHoverMarker(marker))}
            </div>
        );
    }
}

class ParentCanvasDelegate {
    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */
    GetCanvasDimensions() { }
}

export { CelestialMarkerScreen, ParentCanvasDelegate };
