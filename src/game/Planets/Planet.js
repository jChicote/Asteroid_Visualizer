import * as THREE from "three";
import { CelestialObjectDelegate } from "../CelestialObjects/CelestialObjectDelegate.js";
import { CelestialObjectMarkerHandler } from "../Components/Handlers/CelestialObjectMarkerHandler.js";
import { CelestialOrbitalMotionLogic } from "../Components/OrbitalMechanics/CelestialOrbitalMotionLogic.js";
import { EventMediator } from "../../user-interface/mediator/EventMediator.js";
import { GameManager } from "../GameManager.js";
import { GameObject } from "../Entities/GameObject.js";
import { MaterialRenderer } from "../Components/Visual/MaterialRenderer.js";
import { MathHelper } from "../../utils/math-library.js";
import { OrbitalPath } from "../Components/Visual/OrbitalPath/OrbitalPath.js";
import { SolarSystemVisualizer } from "../../SolarSystemVisualizer.js";
import { PlanetRings } from "./PlanetRings.js";

export class Planet extends GameObject {
    constructor(planetCode, planetData, materialConfigurationProvider) {
        super({ planetCode, planetData, materialConfigurationProvider });
    }

    InitialiseFields(parameters) {
        super.InitialiseFields(parameters);

        // Fields
        this.materialConfiguration = parameters.materialConfigurationProvider.GetMaterialConfiguration(parameters.planetCode);
        this.meanMotion = "";
        this.orbitalPeriod = "";
        this.planetCode = parameters.planetCode;
        this.planetData = parameters.planetData;
        this.renderedObject = "";
        this.timeStep = "";
        this.ring = null;

        this.identifier = parameters.planetCode;
        this.objectType = "Planet";
        this.classification = "None";

        // Components
        this.materialRenderer = {};
        this.orbitalMotion = new CelestialOrbitalMotionLogic();
        this.planetState = new PlanetState(parameters.planetData.meanAnomaly, 0);
        this.materialConfigurationProvider = parameters.materialConfigurationProvider;

        // Observers
        this.eventMediator = SolarSystemVisualizer.serviceContainer.Resolve(EventMediator);
    }

    /* -------------------------------------------------------------------------- */
    /*                              Lifecycle Methods                             */
    /* -------------------------------------------------------------------------- */

    Start() {
        this.materialRenderer = new MaterialRenderer(this.materialConfiguration);

        this.orbitalPeriod = this.orbitalMotion.GetOrbitalPeriodInDays(this.planetData.semiMajorAxis);
        this.meanMotion = MathHelper.ConvertDegreesToRadians(this.planetData.meanMotion);
        this.timeStep = this.orbitalMotion.CalculateTimeStep(this.orbitalPeriod);
        this.renderedObject = this.RenderPlanet();

        this.planetDelegate = new CelestialObjectDelegate();
        this.planetDelegate.SetMarker = this.SetMarker.bind(this);
        this.planetDelegate.GetRenderedObject = this.GetRenderedObject.bind(this);
        this.planetDelegate.GetName = this.GetName.bind(this);
        this.planetDelegate.GetType = this.GetType.bind(this);
        this.planetDelegate.OnHoverEnter = this.OnHoverEnter.bind(this);
        this.planetDelegate.OnHoverExit = this.OnHoverExit.bind(this);

        this.markerHandler = new CelestialObjectMarkerHandler({
            eventMediator: this.eventMediator,
            planetCode: this.planetCode,
            planetDelegate: this.planetDelegate,
            renderedObject: this.renderedObject
        });

        // Check whether this planet is Saturn
        if (this.planetCode === "699") {
            this.ring = new PlanetRings("699 Rings", this.renderedObject, this.materialConfigurationProvider);
        }
    }

    // Updates the planet. Used during runtime.
    Update() {
        this.markerHandler.UpdateMarker();

        if (SolarSystemVisualizer.gameManager.gameState.isPaused) return;

        this.UpdateOrbitalState();
        this.SetPlanetPosition(this.renderedObject);
        this.RotatePlanet();
    }

    /* -------------------------------------------------------------------------- */
    /*                                Event Methods                               */
    /* -------------------------------------------------------------------------- */

    OnHoverEnter() {
        this.orbitalPath.HighlightOrbitalPathLine();
    }

    OnHoverExit() {
        this.orbitalPath.DeselectOrbitalPathLine();
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Methods                                  */
    /* -------------------------------------------------------------------------- */

    RenderPlanet() {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(this.GetRadius(), 32, 16),
            this.materialRenderer.GetMaterial());

        mesh.gameObject = this;
        this.SetPlanetPosition(mesh);
        GameManager.scene.add(mesh);

        // Create orbital path
        this.orbitalPath = new OrbitalPath({
            orbitalMotionLogic: this.orbitalMotion,
            highlightColor: this.materialConfiguration.defaultColor,
            normalColor: 0x636363
        });

        this.orbitalPath.CreateOrbitalPath({
            semiMajorAxis: MathHelper.ConvertKilometersToAstronomicalUnits(this.planetData.semiMajorAxis),
            eccentricity: this.planetData.eccentricity,
            inclination: MathHelper.ConvertDegreesToRadians(this.planetData.inclination) * -1,
            lineSegments: 128,
            longitudeOfAscendingNode: MathHelper.ConvertDegreesToRadians(this.planetData.longitudeOfAscendingNode) * -1,
            argumentOfPerihelion: MathHelper.ConvertDegreesToRadians(this.planetData.argumentOfPerihelion) * -1,
            meanAnomaly: this.planetState.meanAnomaly,
            scale: 100
        });

        return mesh;
    }

    RotatePlanet() {
        this.renderedObject.rotation.y += this.orbitalMotion.GetAngularVelocity(this.planetData.sideRealDayPeriod) * this.timeStep;
    }

    SetPlanetPosition(planet) {
        const position = this.orbitalMotion.CalculateOrbitalPosition(
            MathHelper.ConvertKilometersToAstronomicalUnits(this.planetData.semiMajorAxis),
            this.planetData.eccentricity,
            MathHelper.ConvertDegreesToRadians(this.planetData.inclination) * -1,
            MathHelper.ConvertDegreesToRadians(this.planetData.longitudeOfAscendingNode) * -1,
            MathHelper.ConvertDegreesToRadians(this.planetData.argumentOfPerihelion) * -1,
            this.planetState.meanAnomaly,
            100);

        this.SetVector(planet, position);
    }

    GetState() {
        return this.planetState;
    }

    GetData() {
        return this.planetData;
    }

    GetCodeIdentifier() {
        return this.planetCode;
    }

    GetName() {
        return this.planetData.name;
    }

    GetType() {
        return this.objectType;
    }

    GetRadius() {
        return this.planetData.planetRadius * 0.0001; // TODO: ABstract this to make this dynamically scaled
    }

    GetRenderedObject() {
        return this.renderedObject;
    }

    UpdateOrbitalState() {
        this.planetState.currentTime += this.timeStep * SolarSystemVisualizer.gameManager.gameState.timeMultiplier;
        this.planetState.meanAnomaly = this.orbitalMotion.GetCurrentMeanAnomaly(
            this.planetData.meanAnomaly,
            this.meanMotion,
            this.planetState.currentTime);
    }

    // This method is just a passthrough
    SetMarker(marker) {
        this.marker = this.markerHandler.SetMarker(marker);
    }
}

class PlanetState {
    constructor(meanAnomaly, initialTime) {
        this.meanAnomaly = meanAnomaly;
        this.currentTime = initialTime;
    }
}

export { PlanetState };
