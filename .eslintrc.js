module.exports = {
    "extends": "tui",
    "parserOptions": {
        "sourceType": "module"
    },
    "env": {
        "commonjs": true,
        "jasmine": true
    },
    "globals": {
        "util": true,
        "dom": true,
        "tui": true,
        "fixture": true
    },
    "plugins": ["babel"],
    "rules": {
        "lines-around-directive": 0,
        "newline-before-return": 0,
        "sort-imports": "error",
        "no-useless-rename": "error",
        "no-duplicate-imports": ["error", { "includeExports": true }],
        "dot-notation": ["error", { "allowKeywords": true }],
        "prefer-destructuring": [
            "error", {
                "VariableDeclarator": {
                    "array": true,
                    "object": true
                },
                "AssignmentExpression": {
                    "array": false,
                    "object": false
                }
            },
            {
                "enforceForRenamedProperties": false
            }
        ],
        "arrow-body-style": ["error", "as-needed", { "requireReturnForObjectLiteral": true }],
        "object-property-newline": ["error", { "allowMultiplePropertiesPerLine": true }]
    }
};
