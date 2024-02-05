import { ThreeContainer } from "./ThreeContainer.jsx";
import { RootCanvas } from "./user-interface/RootCanvas.jsx";
import { LoadingScreen } from "./user-interface/loading-screen/LoadingScreen.jsx";

function App() {
    return (
        <div className='app-canvas'>
            <ThreeContainer />
            <RootCanvas />
            <LoadingScreen />
        </div>
    );
}

export { App };
