import * as THREE from "three";
import { GameManager } from "../GameManager";

class VisibilityDebugger {
    constructor() {
        const geometry = new THREE.SphereGeometry(2, 32, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        this.forwardCenter = new THREE.Mesh(geometry, material);
        this.forwardTopLeft = new THREE.Mesh(geometry, material);

        GameManager.scene.add(this.forwardCenter);
        GameManager.scene.add(this.forwardTopLeft);
    }

    // An attempt was made to view test sphere on each corner of the screen.\
    // It failed as direction was not calculated correctly when focusing on either the up or right direction.
    Update() {
        const camera = GameManager.gameObjectRegistry.GetGameObject("Camera");

        // const cameraUp = new THREE.Vector3();
        // const cameraRight = new THREE.Vector3();
        // const cameraForward = new THREE.Vector3();

        // camera.GetControlledCamera().getWorldDirection(cameraRight);
        // cameraRight.cross(camera.GetControlledCamera().up).normalize();
        // cameraUp.copy(camera.GetControlledCamera().up).normalize();
        // cameraForward.copy(camera.GetControlledCamera().getWorldDirection(new THREE.Vector3())).normalize();

        // // Transform to world space
        // camera.GetControlledCamera().localToWorld(cameraUp);
        // camera.GetControlledCamera().localToWorld(cameraRight);

        const distance = 55; // The distance you want to move the object
        // const topLeftForwardDirection = new THREE.Vector3().subVectors(cameraUp, cameraRight).normalize();
        // topLeftForwardDirection.add(cameraForward).normalize();
        const newPosition = new THREE.Vector3().copy(camera.GetWorldDirection().multiplyScalar(distance)).add(camera.GetWorldPosition());
        // const newOffsetPosition = new THREE.Vector3().copy(camera.GetWorldPosition()).add(topLeftForwardDirection.multiplyScalar(distance));

        this.forwardCenter.position.copy(newPosition);
    }
}

export { VisibilityDebugger };
