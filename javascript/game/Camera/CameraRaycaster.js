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
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    RaycastToDestination(destination) {
        // Performs raycast
        this.raycaster.setFromCamera(destination, this.camera.GetControlledCamera());

        const intersects = this.raycaster
            .intersectObjects(GameManager.scene.children, false)
            .filter(intersect =>
                ObjectValidator.IsValid(intersect.object.gameObject));

        return intersects;
    }
}

export { CameraRaycaster, CameraRaycasterContract };
