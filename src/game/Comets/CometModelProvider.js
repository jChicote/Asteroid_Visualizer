import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

// Tech debt DEV-166: This code is duplicate of the AsteroidModelProvider
class CometModelProvider {
    constructor() {
        this.objectLocations = [
            "../../../models/comet_1.fbx",
            "../../../models/comet_2.fbx",
            "../../../models/comet_3.fbx"
        ];
    }

    // --------------------------------------------------------------------------
    //                                 Methods
    // --------------------------------------------------------------------------

    GetCometModelGeometry() {
        // Randomly select an asteroid model location
        const selectedLocation = this.objectLocations[(Math.floor(Math.random() * this.objectLocations.length))];

        return new Promise((resolve, reject) => {
            const fbxLoader = new FBXLoader();
            fbxLoader.load(selectedLocation,
                (object) => {
                    const mesh = object.children[0];
                    resolve(mesh.geometry);
                },
                undefined,
                (error) => {
                    console.log("An Error occurred while loading the model:");
                    console.log(error);
                    reject(error);
                }
            );
        });
    }
}

export { CometModelProvider };
