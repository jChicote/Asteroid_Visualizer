import { ThreeContainer } from "./ThreeContainer.jsx";
import { RootCanvas } from "./user-interface/RootCanvas.jsx";

function App() {
    return (
        <div style={{ position: "relative" }}>
            <ThreeContainer />
            <RootCanvas />
        </div>
    );
}

export { App };
