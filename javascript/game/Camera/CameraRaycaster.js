import * as THREE from "three";
import { GameManager } from "../GameManager.js";
import { GameObject } from "../Entities/GameObject.js";
import { ObjectValidator } from "../../utils/ObjectValidator.js";

class CameraRaycasterContract {
    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */
    RaycastToDestination(destination) { }
}

class CameraRaycaster extends GameObject {
    constructor(props) {
        super(props);

        // Fields
        this.camera = props.camera;
        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    Start() {
        const gameObjectRegistry = GameManager.gameObjectRegistry;
        const cameraRaycasterContract = new CameraRaycasterContract();

        cameraRaycasterContract.RaycastToDestination = this.RaycastToDestination.bind(this);
        gameObjectRegistry.RegisterGameObject("CameraRaycaster", cameraRaycasterContract);

        this.arrowHelper = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), 0, 0xff0000);
        GameManager.scene.add(this.arrowHelper);
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    RaycastToDestination(destination) {
        const validIntersects = GameManager.scene.children.filter(child =>
            ObjectValidator.IsValid(child.gameObject) &&
            child.gameObject.objectType === "Star");

        // Exit early if there are no valid objects to raycast against
        if (validIntersects.length === 0) return [];

        const directionToTarget = new THREE.Vector3().subVectors(destination.position, this.camera.GetControlledCamera().position).normalize();

        // Performs raycast
        this.raycaster.set(
            this.camera.GetControlledCamera().position,
            directionToTarget.multiplyScalar(this.camera.GetControlledCamera().position.distanceTo(destination.position)));

        const intersects = this.raycaster
            .intersectObjects(validIntersects, false)
            .filter(intersect =>
                !isNaN(intersect.distance) &&
                intersect.object.uuid !== destination.uuid);

        return intersects;
    }
}

export { CameraRaycaster, CameraRaycasterContract };
