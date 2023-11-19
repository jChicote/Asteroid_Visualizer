import { GameObject } from "./GameObject.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";

class Asteroid extends GameObject {
    constructor(asteroidData) {
        super();

        // Fields

        // Components
        this.materialRenderer = new MaterialRenderer();
    }
}

export { Asteroid };
