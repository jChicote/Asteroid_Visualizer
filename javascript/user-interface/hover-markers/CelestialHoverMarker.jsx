import { PropTypes } from "prop-types";
import { Component, createRef } from "react";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer";
import { GameManager } from "../../game/GameManager";
import { MathHelper } from "../../utils/math-library";
import { EventMediator } from "../mediator/EventMediator";

class CelestialObjectMarker extends Component {
    constructor(props) {
        super(props);

        this.element = createRef();
        this.state = {
            id: props.id,
            screenPosition: props.position,
            currentState: MarkerState.Visible,
            isActive: true
        };

        const markerDelegate = new CelestialHoverMarkerDelegate();
        markerDelegate.CheckIsBehindObject = this.CheckIsBehindObject.bind(this);
        markerDelegate.UpdatePosition = this.SetPosition.bind(this);
        markerDelegate.SetState = this.SetState.bind(this);

        this.celestialObjectDelegate = props.celestialObjectDelegate;
        this.celestialObjectDelegate.SetMarker(markerDelegate);

        this.parentCanvasDelegate = props.parentCanvasDelegate;
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    CheckIsBehindObject() {
        if (!this.state.isActive) return;

        // Hacky implementation
        const camera = GameManager.gameObjectRegistry.GetGameObject("Camera");

        const raycasterDelegate = GameManager.gameObjectRegistry.GetGameObject("CameraRaycaster");
        const intersects = raycasterDelegate.RaycastToDestination(this.celestialObjectDelegate.GetRenderedObject());

        if (intersects.length > 0) {
            // Check for relative distancing
            const planetDistance = MathHelper.GetDistanceBetweenObjects(this.celestialObjectDelegate.GetRenderedObject(), camera.GetControlledCamera());
            const distance = MathHelper.GetDistanceBetweenObjects(intersects[0].object, camera.GetControlledCamera());
            if (planetDistance > distance) this.SetState(MarkerState.Hidden);
        } else {
            // This should be in its own seperate method. This is a hacky way of doing it.
            if (this.state.currentState === MarkerState.Selected) {
                this.SetState(MarkerState.Selected);
            } else {
                this.SetState(MarkerState.Visible);
            }
        }
    }

    GetRaycastIntersects() {
        const raycasterDelegate = GameManager.gameObjectRegistry.GetGameObject("CameraRaycaster");
        const intersects = raycasterDelegate.RaycastToDestination(this.celestialObjectDelegate.GetRenderedObject());
        return intersects;
    }

    CheckIfInFrontOfObject(source, destination) {
        const planetDistance = MathHelper.GetDistanceBetweenObjects(this.celestialObjectDelegate.GetRenderedObject(), source);
        const distance = MathHelper.GetDistanceBetweenObjects(destination, source);

        return planetDistance > distance;
    }

    UpdateMarker() {
        if (!this.state.isActive) return;

        const intersects = this.GetRaycastIntersects();
        if (intersects.length > 0) {
            const camera = GameManager.gameObjectRegistry.GetGameObject("Camera");
            if (CheckIfInFrontOfObject(camera, intersects[0].object)) this.SetState(MarkerState.Hidden);
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
            currentState: !prevState.isActive && prevState.currentState !== MarkerState.Selected ? MarkerState.Visible : prevState.currentState
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

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    componentDidMount() {
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventMediator.Subscribe("ToggleMarkers", this.FlipFlopState.bind(this));
    }

    render() {
        const elementHalfHeight = this.element.current !== null ? (this.element.current.offsetHeight / 2) : 0;
        const elementHalfWidth = this.element.current !== null ? (this.element.current.offsetWidth / 2) : 0;
        const shouldRender = this.state.isActive && this.state.currentState === MarkerState.Visible;

        return (
            <button
                ref= {this.element}
                className="celestial-object-marker marker-shape-circle marker-skin"
                style= {{
                    top: `${this.state.screenPosition.y - elementHalfHeight}px`,
                    left: `${this.state.screenPosition.x - elementHalfWidth}px`,
                    opacity: shouldRender ? "1" : "0"
                }}
                onClick={this.HandleClick.bind(this)}
            />
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
    CheckIsBehindObject() {}

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
