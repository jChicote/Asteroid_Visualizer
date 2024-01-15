import { GameManager } from "../GameManager.js";

class CanvasManager {
    constructor() {
        this.isFullScreen = false;
        this.canvas = document.getElementById("root");

        GameManager.gameObserver.Subscribe("ToggleMenuVisibility", this.ToggleFullScreen.bind(this));
    }

    ToggleFullScreen() {
        if (this.isFullScreen) {
            this.SetToDefault();
        } else {
            this.SetToFullScreen();
        }
    }

    // THIS SHOULD NOT BE DONE HERE. Either use a react component or css variable.
    // Technically this is not full screen but rather 'hide menu'
    SetToFullScreen() {
        const navbar = document.getElementById("navbar");
        const footer = document.getElementById("footer");

        navbar.style.display = "none";
        footer.style.display = "none";

        this.isFullScreen = true;
    }

    SetToDefault() {
        const navbar = document.getElementById("navbar");
        const footer = document.getElementById("footer");

        navbar.style.display = "flex";
        footer.style.display = "block";

        this.isFullScreen = false;
    }
}

export { CanvasManager };
