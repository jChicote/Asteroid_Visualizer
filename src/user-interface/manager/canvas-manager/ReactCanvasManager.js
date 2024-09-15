import { EventMediator } from "../../mediator/EventMediator.js";
import { SolarSystemVisualizer } from "../../../SolarSystemVisualizer.js";

// Manages the canvas elements for React components, html and css.
class ReactCanvasManager {
    constructor() {
        this.isMenuVisible = true;
        this.isFullScreen = document.fullscreenElement;
        this.canvas = document.getElementById("root");

        this.eventObserver = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventObserver.Subscribe("ToggleMenuVisibility", this.OnMenuVisibilityChange.bind(this));
        this.eventObserver.Subscribe("ToggleFullscreen", this.OnFullscreenChange.bind(this));
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    OnMenuVisibilityChange() {
        if (this.isMenuVisible) {
            this.HideMenu();
        } else {
            this.RevealMenu();
        }
    }

    OnFullscreenChange() {
        if (this.isFullScreen) {
            this.TriggerExitFullScreen();
        } else {
            this.TriggerEnterFullScreen();
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    HideMenu() {
        const navbar = document.getElementById("navbar");
        const footer = document.getElementById("footer");

        navbar.style.opacity = "0";
        navbar.style.pointerEvents = "none";
        footer.style.opacity = "0";
        footer.style.pointerEvents = "none";

        this.isMenuVisible = false;
    }

    RevealMenu() {
        const navbar = document.getElementById("navbar");
        const footer = document.getElementById("footer");

        navbar.style.opacity = "1";
        navbar.style.pointerEvents = "auto";
        footer.style.opacity = "1";
        footer.style.pointerEvents = "auto";

        this.isMenuVisible = true;
    }

    TriggerEnterFullScreen() {
        const rootCanvas = document.getElementById("main-container");
        if (rootCanvas.requestFullscreen) {
            rootCanvas.requestFullscreen().then(() => {
                this.isFullScreen = true;
            }).catch(err => {
                console.error(err);
            });
        }
    }

    TriggerExitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            this.isFullScreen = false;
        }
    }
}

export { ReactCanvasManager };
