import { GameManager } from "../../GameManager";

class TargetManager {
    constructor() {
        this.target = null;

        GameManager.gameObserver.Subscribe("OnTargetSelected", this.SetTarget.bind(this));
    }

    /* -------------------------------------------------------------------------- */
    /*                                Event Methods                               */
    /* -------------------------------------------------------------------------- */

    SetTarget(target) {
        if (this.target !== null) {
            this.target.ExecuteMarkerExit();
        }

        this.target = target;
        GameManager.gameObserver.Dispatch("NewTargetSelected", this.target.GetObject());
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    GetTargetObject() {
        return this.target.GetObject();
    }
}

export { TargetManager };
