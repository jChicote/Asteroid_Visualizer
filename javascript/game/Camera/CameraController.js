import * as THREE from "three";
import { CameraInterpolationHandler } from "./CameraInterpolationHandler.js";
import { CameraTransformHandler } from "./CameraTransformHandler.js";
import { CameraZoomHandler } from "./CameraZoomHandler.js";
import { GameManager } from "../GameManager.js";
import { GameObject } from "../Entities/GameObject.js";
import { ObjectValidator } from "../../utils/ObjectValidator.js";
import { OrbitControls } from "../../../addons/OrbitControls.js";

class CameraController extends GameObject {
    constructor(camera, renderer) {
        super({ camera, renderer });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        // Fields
        this.isInteracting = false;
        this.isLerping = false;
        this.renderer = parameters.renderer;
        this.viewTargetPosition = new THREE.Vector3(); // Default the sun as the origin.

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

        // Subscribe custom eventsd
        GameManager.gameObserver.Subscribe("NewTargetSelected", this.OnNewTargetSelected.bind(this));
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
            IsControllerInteracting: this.IsControllerInteracting.bind(this)
        };

        this.cameraTransformHandler = new CameraTransformHandler(
            this.mainCamera,
            this.orbitControls,
            cameraController
        );

        const cameraTransform = {
            CaptureCameraLastPosition: this.cameraTransformHandler.CaptureCameraLastPosition.bind(this.cameraTransformHandler)
        };

        this.cameraZoomHandler = new CameraZoomHandler(
            this.mainCamera,
            cameraController,
            cameraTransform,
            100,
            0.4,
            0.2
        );

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
            this.orbitControls.update();
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    OnMouseUp(event) {
        this.isInteracting = false;
    }

    OnMouseDown(event) {
        this.isInteracting = true;
    }

    OnNewTargetSelected(target) {
        if (ObjectValidator.IsValid(this.viewTarget) &&
            this.viewTarget.object.gameObject.identifier === target.object.gameObject.identifier) {
            return;
        }

        console.log("Target translation started");

        this.EnableLerp();
        this.viewTarget = target;
        this.viewTargetPosition = target.object.position.clone();

        this.cameraZoomHandler.SetMinZoomDistance(target.object.gameObject.GetRadius());
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    DisableLerp() {
        this.isLerping = false;
        this.orbitControls.enabled = true;
    }

    EnableLerp() {
        this.isLerping = true;
        this.orbitControls.enabled = false;
    }

    IsControllerInteracting() {
        return this.isInteracting;
    }

    GetViewTargetPosition() {
        return this.viewTargetPosition;
    }
}

export { CameraController };
