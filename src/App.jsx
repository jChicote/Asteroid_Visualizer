import { ThreeContainer } from "./ThreeContainer.jsx";
import { RootCanvas } from "./user-interface/RootCanvas.jsx";

function App() {
    return (
        <div className='app-canvas'>
            <ThreeContainer />
            <RootCanvas />
        </div>
    );
}

export { App };
