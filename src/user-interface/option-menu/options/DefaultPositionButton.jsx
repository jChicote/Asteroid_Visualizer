import { GameManager } from "../../../game/GameManager";
import { BaseOptionButton } from "./BaseOptionButton.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class DefaultPositionButton extends BaseOptionButton {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
            isVisible: false,
            hasFadedOut: false
        };
    }

    /* -------------------------------------------------------------------------- */
    /*                                Event Methods                               */
    /* -------------------------------------------------------------------------- */

    HandleClick(event) {
        GameManager.gameObserver.Dispatch("OnResetToDefault");

        super.HandleClick(event);
    }

    /* -------------------------------------------------------------------------- */
    /*                                    View                                    */
    /* -------------------------------------------------------------------------- */

    render() {
        const buttonClassName = `rounded-square-button column-button menu-button-skin
        option-button ${this.state.isVisible ? "fade-in" : "fade-out"}`;

        const icon = this.state.isActive ? this.activeIcon : this.inactiveIcon;

        return (
            <button
                className={buttonClassName}
                onClick={this.HandleClick.bind(this)}
                onTransitionEnd={this.HandleTransitionEnd.bind(this)}
                onMouseEnter={this.HandleMouseEnter.bind(this)}
                onMouseLeave={this.HandleMouseExit.bind(this)}>
                <FontAwesomeIcon icon={icon} className="option-icon"/>
            </button>
        );
    }
}

export { DefaultPositionButton };
