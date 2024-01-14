import { ThreeContainer } from "./ThreeContainer.jsx";
import { OverlayUI } from "./user-interface/debug/OverlayUI.jsx";

function App() {
    return (
        <div style={{ position: "relative" }}>
            <ThreeContainer />
            <OverlayUI />
        </div>
    );
}

export { App };
