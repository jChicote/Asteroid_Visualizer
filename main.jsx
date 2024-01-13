// import * as THREE from "three/build/three.module.js";
// import React, { Component } from "react";
// import { AssetManager } from "./javascript/game/Managers/AssetManager/AssetManager.js";
// import { Configuration } from "./javascript/shared/Configuration.js";
// import { GameConfiguration } from "./javascript/game/GameConfiguration.js";
// import { GameManager } from "./javascript/game/GameManager.js";
// import { ObjectValidator } from "./javascript/utils/ObjectValidator.js";
// import { ServiceContainer } from "./javascript/shared/DependencyInjectionServices/ServiceContainer.js";
// import { ServiceProvider } from "./javascript/shared/DependencyInjectionServices/ServiceProvider.js";

// This class is the entry point for the application.
// class SolarSystemVisualizer {
//     static gameManager = null;
//     static gameConfiguration = null;
//     static serviceContainer = null;

//     constructor() {
//         this.canUpdate = false;

//         // Enables caching of textures
//         THREE.Cache.enabled = true;
//         THREE.ColorManagement.enabled = true;
//     }

//     // Initializes scene
//     // This will run different hooks for stages of initialisation
//     async Init() {
//         // Construction
//         const construction = async () => {
//             if (!ObjectValidator.IsValid(SolarSystemVisualizer.serviceContainer)) {
//                 SolarSystemVisualizer.serviceContainer = new ServiceContainer();
//             }
//             const configuration = new Configuration();
//             configuration.ConfigureProject();

//             if (!ObjectValidator.IsValid(SolarSystemVisualizer.gameConfiguration)) {
//                 SolarSystemVisualizer.gameConfiguration = new GameConfiguration();
//             }

//             if (!ObjectValidator.IsValid(SolarSystemVisualizer.gameManager)) {
//                 SolarSystemVisualizer.gameManager =
//                     new GameManager(
//                         SolarSystemVisualizer.serviceContainer
//                             .Resolve(ServiceProvider));
//             }
//         };

//         // Pre-initialisation
//         const preInitialisation = async () => {
//             const serviceProvider = SolarSystemVisualizer.serviceContainer
//                 .Resolve(ServiceProvider);

//             const preLoadManager = serviceProvider.GetService(AssetManager);
//             await preLoadManager.PreLoadAssets();
//         };

//         // Initialisation
//         const initialisation = async () => {
//             await SolarSystemVisualizer.gameManager.Initialise();
//         };

//         await construction();
//         await preInitialisation();
//         await initialisation();
//     }

//     async Start() {
//         // Start the game
//         SolarSystemVisualizer.gameManager.Start();
//     }

//     async ProgramStarter() {
//         this.canUpdate = true;

//         await this.Init();
//         await this.Start();

//         console.log("Program can now start");
//     }

//     Render() {
//         if (solarSystemVisualizer.canUpdate === false) {
//             return;
//         }

//         // Update the scene
//         SolarSystemVisualizer.gameManager.Update();

//         requestAnimationFrame(this.Render);
//     }
// }

// class ThreeContainer extends Component {
//     constructor(props) {
//         super(props);
//         this.mount = React.createRef();
//         this.solarSystemVisualizer = new SolarSystemVisualizer();
//     }

//     async GetRenderer() {
//         return GameManager.renderer;
//     }

//     async Construction() {
//         await this.solarSystemVisualizer.ProgramStarter();

//         const renderer = await this.GetRenderer();
//         this.mount.current.appendChild(renderer.domElement);
//     }

//     async DeConstruct() {
//         const renderer = await this.GetRenderer();
//         this.mount.removeChild(renderer.domElement);
//     }

//     // React Lifecycle Methods
//     componentDidMount() {
//         this.Construction();
//     }

//     componentWillUnmount() {
//         this.DeConstruct();
//     }

//     render() {
//         this.solarSystemVisualizer.Render();

//         return (
//             <div ref={ref => (this.mount = ref)} />
//         );
//     }
// }

// // This is the entry point for the application.
// function App() {
//     return (
//         <div className="App">
//             <ThreeContainer />
//         </div>
//     );
// }

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./javascript/App.jsx";
// import "./src/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

export { App };
