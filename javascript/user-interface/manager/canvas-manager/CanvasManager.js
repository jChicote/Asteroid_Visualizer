import { EventMediator } from "../../mediator/EventMediator.js";
import { SolarSystemVisualizer } from "../../../SolarSystemVisualizer.js";

class CanvasManager {
    constructor() {
        this.isMenuVisible = true;
        this.canvas = document.getElementById("root");

        this.eventObserver = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
        this.eventObserver.Subscribe("ToggleMenuVisibility", this.ToggleFullScreen.bind(this));
    }

    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */

    ToggleFullScreen() {
        if (this.isMenuVisible) {
            this.HideMenu();
        } else {
            this.RevealMenu();
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
}

export { CanvasManager };
