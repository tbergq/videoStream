module.exports = {
    "extends": [
        "airbnb",
        "prettier",
        "prettier/react",
    ],
    "plugins": [
        "prettier",
      ],
    "globals": {
        "document": true,
        "fetch": true,
        "window": true,
        "cast": true,
        "chrome": true,
        "describe": true,
        "it": true,
        "expect": true,
        "jest": true,
        "beforeEach": true
    },
    "rules": {
        "react/jsx-filename-extension": 0,
        "no-unused-expressions": 0,
        'import/prefer-default-export': 0,
        "jsx-a11y/media-has-caption": 0,
        "prettier/prettier": [
            "error",
            {
              "bracketSpacing": true,
              "printWidth": 80,
              "singleQuote": true,
              "tabWidth": 2,
              "trailingComma": "all",
            }
          ],
    }
};