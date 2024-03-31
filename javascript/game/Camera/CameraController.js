import * as THREE from "three";
import { OrbitControls } from "../../../addons/OrbitControls.js";
import { ObjectValidator } from "../../utils/ObjectValidator.js";
import { GameObject } from "../Entities/GameObject.js";
import { GameManager } from "../GameManager.js";
import { CameraInterpolationHandler } from "./CameraInterpolationHandler.js";
import { CameraTransformHandler } from "./CameraTransformHandler.js";
import { CameraZoomHandler } from "./CameraZoomHandler.js";

class CameraControlState {
    constructor() {
        this.isInteracting = false;
        this.isLerping = false;
        this.isZooming = false;
    }
}

class CameraController extends GameObject {
    constructor(camera, renderer, defaultPosition) {
        super({ camera, renderer, defaultPosition });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        // Fields
        this.cameraState = new CameraControlState();
        this.isInputEnabled = true;
        this.isLerping = false;
        this.renderer = parameters.renderer;
        this.viewTargetPosition = new THREE.Vector3(); // Default the sun as the origin.
        this.cameraDefaultPosition = parameters.defaultPosition;

        // Components
        this.mainCamera = parameters.camera;
        this.celestialObjectSelector = {};
        this.cameraTransformHandler = {};
        this.cameraZoomHandler = {};
        this.orbitControls = {};
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    Awake() {
        // Subscribe input events
        GameManager.gameObserver.Subscribe("OnMouseUp", this.OnMouseUp.bind(this));
        GameManager.gameObserver.Subscribe("OnMouseDown", this.OnMouseDown.bind(this));
        GameManager.gameObserver.Subscribe("OnHoverMarkerEnter", this.DisableInput.bind(this));
        GameManager.gameObserver.Subscribe("OnHoverMarkerExit", this.EnableInput.bind(this));

        // Subscribe custom events
        GameManager.gameObserver.Subscribe("NewTargetSelected", this.OnNewTargetSelected.bind(this));
        GameManager.gameObserver.Subscribe("OnResetToDefault", this.OnResetToDefault.bind(this));
    }

    Start() {
        // Setup default controls
        this.orbitControls = new OrbitControls(this.mainCamera.GetControlledCamera(), this.renderer.domElement);
        this.orbitControls.enabled = true;
        this.orbitControls.enableDamping = true;
        this.orbitControls.enableZoom = false;
        this.orbitControls.minDistance = 0.4;
        this.orbitControls.maxDistance = 50;
        this.orbitControls.target = this.viewTargetPosition;
        this.orbitControls.update();

        const cameraController = {
            DisableLerp: this.DisableLerp.bind(this),
            GetViewTargetPosition: this.GetViewTargetPosition.bind(this),
            GetTargetRadius: this.GetViewTargetRadius.bind(this),
            IsControllerInteracting: this.IsControllerInteracting.bind(this)
        };

        this.cameraTransformHandler = new CameraTransformHandler({
            mainCamera: this.mainCamera,
            cameraState: this.cameraState,
            orbitControls: this.orbitControls,
            cameraController
        });

        const cameraTransform = {
            CaptureCameraLastPosition: this.cameraTransformHandler.CaptureCameraLastPosition.bind(this.cameraTransformHandler),
            CaptureCameraLastRelativeDistance: this.cameraTransformHandler.CaptureCameraLastRelativeDistance.bind(this.cameraTransformHandler)
        };

        this.cameraZoomHandler = new CameraZoomHandler({
            camera: this.mainCamera,
            cameraState: this.cameraState,
            cameraController,
            cameraTransform,
            zoomMaxDistance: 100,
            zoomMinDistance: 0.4,
            zoomSpeed: 0.2
        });

        const cameraZoomHandler = {
            GetMinZoomDistance: this.cameraZoomHandler.GetMinZoomDistance.bind(this.cameraZoomHandler)
        };

        this.cameraInterpolationHandler = new CameraInterpolationHandler(
            this.mainCamera,
            cameraController,
            cameraTransform,
            cameraZoomHandler,
            0.05
        );
    }

    Update() {
        if (ObjectValidator.IsValid(this.viewTarget)) {
            this.viewTargetPosition = this.viewTarget.object.position.clone();
        } else {
            return;
        }

        if (this.isLerping) {
            this.cameraInterpolationHandler.InterpolateToTargetPosition();
        } else {
            this.cameraZoomHandler.CalculateZoom();
            this.cameraTransformHandler.FollowTarget();

            if (this.isInputEnabled) {
                this.orbitControls.update();
            }
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    OnMouseUp(event) {
        this.cameraState.isInteracting = false;
    }

    OnMouseDown(event) {
        this.cameraState.isInteracting = true;
    }

    OnNewTargetSelected(target) {
        if (ObjectValidator.IsValid(this.viewTarget) &&
            this.viewTarget.object.gameObject.identifier === target.object.gameObject.identifier) {
            return;
        }

        this.EnableLerp();
        this.viewTarget = target;
        this.viewTargetPosition = target.object.position.clone();

        this.cameraZoomHandler.SetMinZoomDistance(target.object.gameObject.GetRadius());
    }

    OnResetToDefault() {
        // Get Sun Object
        const sun = GameManager.gameObjectRegistry.GetGameObject("Sun");

        this.OnNewTargetSelected({ object: sun });
        this.viewTargetPosition = this.cameraDefaultPosition;
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    DisableLerp() {
        this.isLerping = false;
        this.orbitControls.enabled = true;

        // Restore previous time control state.
        GameManager.gameObserver.Dispatch("UpdateIsTimePaused", false);
    }

    EnableLerp() {
        this.isLerping = true;
        this.orbitControls.enabled = false;

        // Pause time control to allow completion of interpolation of positions.
        GameManager.gameObserver.Dispatch("UpdateIsTimePaused", true);
    }

    DisableInput() {
        this.isInputEnabled = false;
    }

    EnableInput() {
        this.isInputEnabled = true;
    }

    IsControllerInteracting() {
        return this.cameraState.isInteracting;
    }

    GetViewTargetPosition() {
        return this.viewTargetPosition;
    }

    GetViewTargetRadius() {
        return this.viewTarget.object.gameObject.GetRadius();
    }
}

export { CameraController, CameraControlState };
