import { Component } from "react";

// This is just a test debug component to show how to overlay UI elements on top of the canvas.
class OverlayUI extends Component {
    handleClick() {
        console.log("Button clicked");
        // Add any logic you want to execute on button click
    }

    render() {
        return (
            <div style={{ position: 'absolute', top: 40, left: 60, width: '100%', height: '100%', pointerEvents: 'none' }}>
                {/* Your overlay content here */}
                <div style={{ pointerEvents: 'auto' }}>
                    {/* Interactive elements here */}
                    <button onClick={this.handleClick.bind(this)} style={{ margin: '10px' }}>Click Me</button>
                </div>
            </div>
        );
    }
}

export { OverlayUI };
