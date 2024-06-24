import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

// Tech debt DEV-166: This is a duplicate of the CometModelProvider
class AsteroidModelProvider {
    constructor() {
        this.objectLocations = [
            "../../../public/models/asteroid_1.fbx",
            "../../../public/models/asteroid_2.fbx",
            "../../../public/models/asteroid_3.fbx",
            "../../../public/models/asteroid_4.fbx",
            "../../../public/models/asteroid_5.fbx"
        ];
    }

    // --------------------------------------------------------------------------
    //                                 Methods
    // --------------------------------------------------------------------------

    GetAsteroidModelGeometry() {
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

export { AsteroidModelProvider };
