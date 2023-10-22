module.exports = {
    extends: ["semistandard"],
    rules: {
        "array-bracket-spacing": ["error", "never"],
        "comma-dangle": ["error", {
            arrays: "never",
            objects: "never",
            imports: "never",
            exports: "never",
            functions: "never"
        }],
        indent: ["warn", 4],
        "indent-legacy": "off",
        "space-before-function-paren": ["error", {
            anonymous: "never",
            named: "never",
            asyncArrow: "always"
        }],
        "no-undef": "off",
        "no-whitespace-before-property": "off",
        quotes: ["warn", "double"]
    }
};
