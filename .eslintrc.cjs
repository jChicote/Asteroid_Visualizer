module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "semistandard",
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
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
        quotes: ["warn", "double"],
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
    }
};
