import React, { Component } from "react";
import { SolarSystemVisualizer } from "./SolarSystemVisualizer.js";
import { GameManager } from "./game/GameManager.js";

class ThreeContainer extends Component {
    constructor(props) {
        super(props);
        this.mount = React.createRef();
        this.solarSystemVisualizer = new SolarSystemVisualizer();
    }

    // TODO: Canvas related behaviour should be refactored into a common location.
    async GetRenderer() {
        return GameManager.renderer;
    }

    async Construction() {
        try {
            await this.solarSystemVisualizer.ProgramStarter();
            const renderer = await this.GetRenderer();
            this.mount.appendChild(renderer.domElement);

            this.solarSystemVisualizer.Render();
        } catch (error) {
            console.error("Error during construction:", error);
        }
    }

    // async DeConstruct() {
    //     const renderer = await this.GetRenderer();
    //     this.mount.removeChild(renderer.domElement);
    // }

    // React Lifecycle Methods
    componentDidMount() {
        this.Construction();
    }

    // componentWillUnmount() {
    //     this.DeConstruct();
    // }

    render() {
        return (
            <div ref={ref => (this.mount = ref)} />
        );
    }
}

export { ThreeContainer };
