import * as THREE from "../../../node_modules/three/build/three.module.js";
import { CameraRaycaster } from "./CameraRaycaster.js";
import { CameraZoomHandler } from "./CameraZoomHandler.js";
import { GameManager } from "../GameManager.js";
import { GameObject } from "../Entities/GameObject.js";
import { ObjectValidator } from "../../utils/ObjectValidator.js";
import { OrbitControls } from "../../../addons/OrbitControls.js";
import { CameraTransformHandler } from "./CameraTransformHandler.js";
import { CameraInterpolationHandler } from "./CameraInterpolationHandler.js";

class CameraController extends GameObject {
    constructor(camera, renderer) {
        super({ camera, renderer });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        // Fields
        this.isInteracting = false;
        this.isLerping = false;
        this.mainCamera = parameters.camera;
        this.renderer = parameters.renderer;
        this.viewTargetPosition = new THREE.Vector3(); // Default the sun as the origin.

        // Components
        this.cameraRaycaster = {};
        this.orbitControls = {};
        this.cameraZoomHandler = {};
        this.cameraTransformHandler = {};
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    Awake() {
        // Handle Events
        const canvas = document.getElementById("canvas-container");
        canvas.addEventListener("mousedown", this.OnMouseDown.bind(this));
        canvas.addEventListener("mouseup", this.OnMouseUp.bind(this));

        GameManager.gameObserver.Subscribe("OnPointerEnter", this.SetNewViewTarget.bind(this));
    }

    Start() {
        this.cameraRaycaster = new CameraRaycaster(this.mainCamera);

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

    SetNewViewTarget(target) {
        if (ObjectValidator.IsValid(this.viewTarget) &&
            this.viewTarget.object.gameObject.identifier === target.object.gameObject.identifier) {
            return;
        }

        this.EnableLerp();
        this.viewTarget = target;
        this.viewTargetPosition = target.object.position.clone();
    }

    IsControllerInteracting() {
        return this.isInteracting;
    }

    GetViewTargetPosition() {
        return this.viewTargetPosition;
    }
}

export { CameraController };
