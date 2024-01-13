import React, { Component } from "react";
import { SolarSystemVisualizer } from "./SolarSystemVisualizer";

class ThreeContainer extends Component {
    constructor(props) {
        super(props);
        this.mount = React.createRef();
        this.solarSystemVisualizer = new SolarSystemVisualizer();
    }

    async GetRenderer() {
        return GameManager.renderer;
    }

    async Construction() {
        await this.solarSystemVisualizer.ProgramStarter();

        const renderer = await this.GetRenderer();
        this.mount.current.appendChild(renderer.domElement);
    }

    async DeConstruct() {
        const renderer = await this.GetRenderer();
        this.mount.removeChild(renderer.domElement);
    }

    // React Lifecycle Methods
    componentDidMount() {
        this.Construction();
    }

    componentWillUnmount() {
        this.DeConstruct();
    }

    render() {
        this.solarSystemVisualizer.Render();

        return (
            <div ref={ref => (this.mount = ref)} />
        );
    }
}

export { ThreeContainer };
