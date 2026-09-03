import globals from 'globals';
import mocha from 'eslint-plugin-mocha';
import codeceptjs from 'eslint-plugin-codeceptjs';

export default [
    {
        ignores: [
            'node_modules/**',
            'coverage/**',
            'definitions/**',
            'ccd-definition-processor/**',
            'saucelabs.conf.js',
            'smoke-output/**',
            'functional-output/**',
            'build/**',
            'test/end-to-end/reporters/accessibility-reporter/resources/angular.min.js',
            'test-results/**',
            '.yarn/**'
        ]
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2019,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jquery,
                ...globals.mocha
            }
        },
        plugins: {
            mocha,
            codeceptjs
        },
        rules: {
            'linebreak-style': ['error', 'unix'],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'comma-dangle': ['error', 'never'],
            'camelcase': 'off',
            'eqeqeq': 'error',
            'require-yield': 'off',
            'indent': ['error', 2],
            'mocha/no-exclusive-tests': 'error',
            'max-len': [
                'error',
                {
                    code: 200,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreComments: true,
                    ignoreTrailingComments: true,
                    ignoreRegExpLiterals: true,
                    ignorePattern: '.*exports.*=.*class.*|.*if \\(.*\\)|.*\\?.*:.*|.*\\|\\|.*|.*&&.*'
                }
            ],
            'arrow-body-style': ['error', 'always'],
            'no-process-env': 'off',
            'no-magic-numbers': [
                'error',
                {
                    ignoreArrayIndexes: true,
                    enforceConst: true,
                    ignore: [-1, 0, 1]
                }
            ],
            'max-nested-callbacks': ['error', 5],
            'max-depth': ['error', 4],
            'no-console': 'off',
            'no-undef': 'off'
        }
    }
];