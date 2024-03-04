import { Component, createRef } from "react";
import { PropTypes } from "prop-types";
import { MathHelper } from "../../utils/math-library";
import { GameManager } from "../../game/GameManager";

class CelestialObjectMarker extends Component {
    constructor(props) {
        super(props);

        this.element = createRef();
        this.state = {
            screenPosition: props.position,
            currentState: MarkerState.Visible
        };

        const markerDelegate = new CelestialHoverMarkerDelegate();
        markerDelegate.UpdatePosition = this.SetPosition.bind(this);
        markerDelegate.SetState = this.SetState.bind(this);

        this.celestialObjectDelegate = props.celestialObjectDelegate;
        this.celestialObjectDelegate.SetMarker(markerDelegate);

        this.parentCanvasDelegate = props.parentCanvasDelegate;
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    SetPosition(position) {
        const cameraDelegate = GameManager.gameObjectRegistry.GetGameObject("Camera");
        const screenPosition = MathHelper.WorldSpaceToScreenSpace(
            position,
            {
                width: this.parentCanvasDelegate.GetCanvasDimensions().width,
                height: this.parentCanvasDelegate.GetCanvasDimensions().height
            },
            cameraDelegate
        );

        this.setState({ screenPosition });
    }

    SetState(nextState) {
        if (this.state.currentState !== nextState) {
            this.setState({ currentState: nextState });
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        console.log(this.element.current.offsetWidth);
    }

    render() {
        const elementHalfHeight = this.element.current !== null ? (this.element.current.offsetHeight / 2) : 0;
        const elementHalfWidth = this.element.current !== null ? (this.element.current.offsetWidth / 2) : 0;

        return (
            <div
                ref= {this.element}
                className="celestial-object-marker marker-shape-circle marker-skin"
                style= {{
                    top: `${this.state.screenPosition.y - elementHalfHeight}px`,
                    left: `${this.state.screenPosition.x - elementHalfWidth}px`
                }}
            />
        );
    }
}

CelestialObjectMarker.propTypes = {
    position: PropTypes.object.isRequired,
    celestialObjectDelegate: PropTypes.object.isRequired,
    parentCanvasDelegate: PropTypes.object.isRequired
};

const MarkerState = {
    Hidden: 0,
    Visible: 1,
    Faded: 2
};

class CelestialHoverMarkerDelegate {
    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    UpdatePosition(position) { }

    SetState(nextState) { }
}

export { CelestialObjectMarker, CelestialHoverMarkerDelegate, MarkerState };
