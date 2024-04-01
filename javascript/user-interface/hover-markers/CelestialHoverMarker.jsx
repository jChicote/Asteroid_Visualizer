import { Component, createRef } from "react";
import { EventMediator } from "../mediator/EventMediator";
import { GameManager } from "../../game/GameManager";
import { MathHelper } from "../../utils/math-library";
import { PropTypes } from "prop-types";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer";

class CelestialObjectMarker extends Component {
    constructor(props) {
        super(props);

        this.label = createRef();
        this.element = createRef();
        this.state = {
            id: props.id,
            screenPosition: props.position,
            currentState: MarkerState.Visible,
            isActive: true,
            isHovering: false,
            name: props.celestialObjectDelegate.GetName()
        };

        const markerDelegate = new CelestialHoverMarkerDelegate();
        markerDelegate.UpdateMarkerState = this.UpdateMarkerState.bind(this);
        markerDelegate.UpdatePosition = this.SetPosition.bind(this);
        markerDelegate.SetState = this.SetState.bind(this);

        this.celestialObjectDelegate = props.celestialObjectDelegate;
        this.celestialObjectDelegate.SetMarker(markerDelegate);

        this.parentCanvasDelegate = props.parentCanvasDelegate;
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleMarkers", this.FlipFlopState.bind(this));
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    UpdateMarkerState(hasIntersected, isInFront) {
        if (!this.state.isActive) return;

        if (hasIntersected && isInFront) {
            this.SetState(MarkerState.Hidden);
        } else if (this.state.currentState === MarkerState.Selected) {
            this.SetState(MarkerState.Selected);
        } else {
            this.SetState(MarkerState.Visible);
        }
    }

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

    FlipFlopState() {
        this.setState(prevState => ({
            isActive: !prevState.isActive,
            currentState: !prevState.isActive && prevState.currentState !== MarkerState.Selected
                ? MarkerState.Visible
                : prevState.currentState
        }));
    }

    SetState(nextState) {
        this.setState({ currentState: nextState });
    }

    /* -------------------------------------------------------------------------- */
    /*                                Event Methods                               */
    /* -------------------------------------------------------------------------- */

    HandleClick(event) {
        this.setState({ currentState: MarkerState.Selected });

        const command = new CelestialHoverMarkerCommand({
            objectDelegate: this.celestialObjectDelegate,
            hoverMarker: this
        });

        GameManager.gameObserver.Dispatch("OnTargetSelected", command);
    }

    HandleExitEvent() {
        if (!this.state.isActive) return;

        this.SetState(MarkerState.Visible);
    }

    HandleMouseEnter() {
        this.setState({ isHovering: true });

        GameManager.gameObserver.Dispatch("OnHoverMarkerEnter");
    }

    HandleMouseExit() {
        this.setState({ isHovering: false });

        GameManager.gameObserver.Dispatch("OnHoverMarkerExit");
    }

    /* -------------------------------------------------------------------------- */
    /*                                    View                                    */
    /* -------------------------------------------------------------------------- */

    render() {
        const elementHalfHeight = this.element.current !== null ? (this.element.current.offsetHeight / 2) : 0;
        const elementHalfWidth = this.element.current !== null ? (this.element.current.offsetWidth / 2) : 0;

        const labelHeight = this.label.current !== null ? this.label.current.offsetHeight : 0;
        const labelHalfWidth = this.label.current !== null ? (this.label.current.offsetWidth / 2) : 0;

        const shouldRender = this.state.isActive && this.state.currentState === MarkerState.Visible;

        return (
            <div style={{ position: "relative" }}>
                <button
                    ref= {this.element}
                    className="celestial-object-marker marker-shape-circle marker-skin"
                    style= {{
                        top: `${this.state.screenPosition.y - elementHalfHeight}px`,
                        left: `${this.state.screenPosition.x - elementHalfWidth}px`,
                        opacity: shouldRender ? "1" : "0",
                        pointerEvents: shouldRender ? "all" : "none"
                    }}
                    onClick={this.HandleClick.bind(this)}
                    onMouseEnter={this.HandleMouseEnter.bind(this)}
                    onMouseLeave={this.HandleMouseExit.bind(this)}
                />
                <div
                    ref={this.label}
                    className="marker-label"
                    style= {{
                        top: `${this.state.screenPosition.y - labelHeight - 8}px`,
                        left: `${this.state.screenPosition.x - labelHalfWidth}px`,
                        opacity: this.state.isHovering ? "1" : "0"
                    }}>
                    <p>{this.state.name}</p>
                </div>
            </div>
        );
    }
}

CelestialObjectMarker.propTypes = {
    id: PropTypes.string.isRequired,
    position: PropTypes.object.isRequired,
    celestialObjectDelegate: PropTypes.object.isRequired,
    parentCanvasDelegate: PropTypes.object.isRequired
};

const MarkerState = {
    Hidden: 0,
    Visible: 1,
    Faded: 2,
    Selected: 3
};

class CelestialHoverMarkerDelegate {
    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */
    UpdateMarkerState() {}

    UpdatePosition(position) { }

    SetState(nextState) { }
}

class CelestialHoverMarkerCommand {
    constructor(props) {
        this.object = props.objectDelegate;
        this.hoverMarker = props.hoverMarker;
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    GetObject() {
        return { object: this.object.GetRenderedObject() };
    }

    ExecuteMarkerExit() {
        return this.hoverMarker.HandleExitEvent();
    }
}

export {
    CelestialHoverMarkerCommand,
    CelestialHoverMarkerDelegate,
    CelestialObjectMarker,
    MarkerState
};
