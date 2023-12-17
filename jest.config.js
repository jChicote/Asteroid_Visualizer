export default {
    testEnvironment: "jest-environment-node",
    transform: {},
    verbose: true,
    testPathIgnorePatterns: [
        "/node_modules/"
    ],
    testMatch: [
        "**/Asteroid_Visualizer/Tests/Web/Application/UseCases/**/*.tests.js"
    ]
};
