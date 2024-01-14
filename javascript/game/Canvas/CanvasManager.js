class CanvasManager {
    constructor() {
        this.canvas = document.getElementById("root");
    }

    // THIS SHOULD NOT BE DONE HERE. Either use a react component or css variable.
    // Technically this is not full screen but rather 'hide menu'
    SetToFullScreen() {
        const navbar = document.getElementById("navbar");
        const footer = document.getElementById("footer");

        navbar.style.display = "none";
        footer.style.display = "none";
    }

    SetToDefault() {
        const navbar = document.getElementById("navbar");
        const footer = document.getElementById("footer");

        navbar.style.display = "flex";
        footer.style.display = "block";
    }
}

export { CanvasManager };
