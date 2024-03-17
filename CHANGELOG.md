# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
### Changed
- Website theme to use darker greys over maroon.
- Supports React.js and Vite.js.
- Official option buttons included for interaction.
- Loading screen added on opening the visualiser.
- Time control buttons added for time scrolling.
- Hover markers added for planet selection.

## [3.0.0] - 2024-01-05
### Added
- Seperate use cases added for crud-like operations for all celestial objects.
- Gateways to interface with NASA's Horizon and SBDB Query APIs.
- Custom proxy to handle requests and responses from the APIs.
- Added three.js project with functional rendering.
- Included base GameObject for game behaviour and objects.
- Included main 8 planets and 1 drawf planet pluto in the visualization.
- Included Atira classed asteroids in the visualization.
- Included Halley classed comets in the visualization.
- Centralised visualizer behaviour to use the persistent GameManager.
- Included orbital motions for all celestial objects.
- Included time control behaviour for real-time orbital scrubbing.
- Included asset loading for textures and shaders
- Included custom shader support and management.
- Included general material renderers.
- Debug graphical user interfaces for prototyping.
- Camera interpolation and translation responding to user input
- Camera object selection in game-scene.
- Camera light accessible through debug GUI.
- Added textures for each planet.
- Added texture for background sky.

### Changed
- Renamed base project class to 'SolarSystemVisualizer'
- Improved render lifecycle to mimic a 'unity' based lifecycle.

## [2.0.0] - 2023-09-17
### Added
- New project names 'Asteroid-Visualiser',
- Created initial project files.
- Simple basic website setup with css.


[3.0.0]: https://github.com/jChicote/Asteroid_Visualizer/compare/v2.0.1...v3.0.0
[2.0.0]: https://github.com/jChicote/Asteroid_Visualizer/releases/tag/v2.0.1