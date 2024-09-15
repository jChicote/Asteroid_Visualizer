import { GameManager } from "../../GameManager.js";

// Manages the canvas elements for three.js related html and css.
class ThreeCanvasManager {
    constructor() {
        document.addEventListener("fullscreenchange", this.OnSceneDimenionChange.bind(this));
    }

    /* -------------------------------------------------------------------------- */
    /*                                Event Handler                               */
    /* -------------------------------------------------------------------------- */

    OnSceneDimenionChange() {
        if (document.fullscreenElement) {
            const windowWidth = window.screen.width;
            const windowHeight = window.screen.height;

            this.SetThreeSceneDimensions(windowWidth, windowHeight);
        } else {
            const innerWindowWidth = window.innerWidth;
            const innerWindowHeight = window.innerHeight;

            this.SetThreeSceneDimensions(innerWindowWidth, innerWindowHeight);
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    SetThreeSceneDimensions(width, height) {
        const camera = GameManager.gameObjectRegistry.GetGameObject("Camera");
        camera.SetAspectRatio(width / height);
        console.log("Aspect ratio updated");
        GameManager.renderer.setSize(width, height);
    }
}

export { ThreeCanvasManager };
