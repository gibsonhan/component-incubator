// Config values:
// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
//

module.exports = {
  root: true,
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:lodash/recommended',
    'plugin:compat/recommended',
  ],

  plugins: ['compat', 'jest', 'jsdoc', 'lodash', 'react-hooks'],

  parser: '@babel/eslint-parser',

  globals: {
    AbortController: 'readonly',
  },

  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: [
          'node_modules',
          'src',
        ],
      },
    },
    jsdoc: {
      tagNamePreference: {
        returns: 'return',
      },
    },
    polyfills: [
      'AbortController',
      'Array.from',
      'fetch',
      'Object.assign',
      'Promise',
      'URLSearchParams',
    ],
  },

  rules: {
    // Whitespace
    // ----------

    // Switch cases should be indented in switch block.
    indent: [2, 2, {SwitchCase: 1}],

    // We've decided to keep block indentation on blank lines.
    // Trailing whitespace on code or comment lines is still prohibited, though.
    'no-trailing-spaces': [2, {skipBlankLines: true}],

    // Prohibit multiple consecutive spaces except in variable declaration.
    // Sometimes aligning variable values aids visual grouping/comparison. Use your judgement.
    'no-multi-spaces': [2, {exceptions: {VariableDeclarator: true}}],

    // For single line object literals, there must 0 spaces before and 1 space after colon.
    // For multi-line object literals, there must 0 spaces before and 1 or more after colon.
    // This allows (but does not require) aligning values of a multi-line object literal.
    'key-spacing': [2, {
      singleLine: {beforeColon: false, afterColon: true, mode: 'strict'},
      multiLine:  {beforeColon: false, afterColon: true, mode: 'minimum'},
    }],
    'operator-linebreak': [1, 'after', {
      overrides: {
        '?': 'before',
        ':': 'before',
      },
    }],

    // Prohibit spaces inside object literals.
    // This is consistent with no spaces inside parentheses or square brackets.
    'object-curly-spacing': [2, 'never'],
    'react/jsx-curly-spacing': [2, 'never'],

    // use newlines consistently within braces
    'object-curly-newline': [2, {
      ObjectExpression: {consistent: true},
      ObjectPattern: {consistent: true},
      ImportDeclaration: {consistent: true},
      ExportDeclaration: {consistent: true},
    }],

    'no-multiple-empty-lines': [2, {
      max: 3,
      maxEOF: 0,
    }],
    'padded-blocks': 'off',

    'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],

    // don't enforce linebreak-style, rely on git to handle it
    'linebreak-style': 'off',

    // disable unused rules and rules those that we don't follow
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'import/no-unresolved': 'off',
    'import/no-cycle': 'off',
    'react/no-unused-state': 'off',
    'react/no-this-in-sfc': 'off',
    'react/button-has-type': 'off',
    'react/no-danger': 'off',
    'react/no-deprecated': 'off',
    'react/require-default-props': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': ['error', {
      // default
      tr: ['none', 'presentation'],
      // customizations:
      canvas: ['img'],
    }],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [
      'error',
      {
        // default:
        ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
        li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
        table: ['grid'],
        td: ['gridcell'],
        // customizations:
        nav: ['tablist'],
      },
    ],

    // Misc
    // ----

    // customize eslint-config-airbnb-base/rules/imports.js: add *.stories.js
    'import/no-extraneous-dependencies': [2, {
      devDependencies: [
        '**/__tests__/**', // jest pattern
        '**/__mocks__/**', // jest pattern
        '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
        '**/jest.config.js', // jest config
        '**/jest.setup.js', // jest setup
        '**/*.stories.js', // storybook pattern
        '**/webpack.config.js', // webpack config
        '**/webpack.config.*.js', // webpack config
      ],
      optionalDependencies: false,
    }],

    // import directly from lodash
    'lodash/import-scope': [2, 'member'],
    // never use _.chain() - not supported in babel-plugin-lodash
    'lodash/chaining': [2, 'never'],
    'lodash/matches-prop-shorthand': [2, 'never'],
    'lodash/matches-shorthand': [2, 'never'],
    'lodash/prefer-constant': [0],
    'lodash/prefer-includes': [0],
    'lodash/prefer-invoke-map': [0],
    'lodash/prefer-map': 'off',
    'lodash/prefer-reject': [0],
    'lodash/prefer-startswith': [0],
    'lodash/prop-shorthand': [0],
    // lodash's [ filter, forEach, map ] are faster
    // not supported by IE: endsWidth, includes, startsWith, values
    'lodash/prefer-lodash-method': [1, {
      ignoreMethods: [
        'map', 'endsWith', 'includes', 'isArray', 'keys', 'replace', 'split', 'toLowerCase',
        'startsWith', 'trim', 'values',
      ],
    }],

    // This change is mainly to allow +/- in the same line
    // See https://github.com/airbnb/javascript/issues/1071
    'no-mixed-operators': [2, {allowSamePrecedence: true}],

    // Allow function use before definition.
    // This is okay because definition is hoisted.
    'no-use-before-define': [2, 'nofunc'],

    // Prohibit unused variables except for function arguments.
    // When overriding a function or implementing a callback, it can be nice to
    // list all of the arguments, even if not all are used.
    'no-unused-vars': [2, {args: 'none'}],

    // Allow functions to return values in some cases and nothing in other cases.
    'consistent-return': 0,

    // Allow return in else blocks.
    // While a return in an else block can technically be moved out that block,
    // leaving it inside can be more explict and, potentially, consistent with if block.
    'no-else-return': 0,

    // Limit lines to 100 characters except in JSX/HTML.
    'max-len': [1, {
      code: 120,
      tabWidth: 2,
      comments: 120,
      ignoreComments: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignorePattern: '<.+>',
    }],

    // Allow leading/trailing underscores in identifiers.
    // There is a common convention of indicating that certain object methods
    // or attributes are "private" by starting their name with a single underscore.
    // We occasionally use this convention.
    'no-underscore-dangle': 0,

    // Don't require a radix when using parseInt().
    // Before ES5, parseInt would attempt to "intelligently" autodetect the
    // radix -- for example, assuming base 8 when a leading 0 was provided.
    // Since ES5, however, base 10 is always applied when no radix is provided.
    // Because we have no plans to target pre-ES5 environments, no radix is needed.
    radix: 0,


    // ES6 Features
    // ----------

    // downgrade to warning
    // Why? Destructuring saves you from creating temporary references for those properties.
    'prefer-destructuring': [1, {
      VariableDeclarator: {
        array: false,
        object: true,
      },
      AssignmentExpression: {
        array: false,
        object: false,
      },
    }, {
      enforceForRenamedProperties: false,
    }],
    'react/destructuring-assignment': 0,

    // Allow string concatenation.
    // While template strings are generally preferable, occasionally string
    // concatenation is simpler/shorter.
    'prefer-template': 0,

    // Allow use of `arguments`.
    // Using `arguments` can be handy when you want to declare each function
    // argument in the paramater list but still use the combined arguments
    // as an array in the same function.
    'prefer-rest-params': 0,

    // Allow multiple import statements from the same file.
    // Desirable when importing default value in one statement and named values in another.
    'import/no-duplicates': 0,
    'no-duplicate-imports': 0,

    // Require parens in arrow function arguments
    'arrow-parens': [2, 'always'],


    // React and JSX
    // -------------

    // don't need React import with new jsx transform
    'react/react-in-jsx-scope': 'off',

    // Don't use .jsx for React components
    'react/jsx-filename-extension': 'off',

    // Don't require React components be defined with ES6 class extend statements.
    'react/prefer-es6-class': 1,

    // Allow multiple components to be defined in the same file.
    // If a sub-component is only ever used by one parent component, then
    // it can make sense to include it in the same file as the parent.
    'react/no-multi-comp': 0,

    // Require JSX boolean attributes always include the boolean literal.
    // <Comp disabled={true} /> is more explicit and obvious than <Comp disabled />
    'react/jsx-boolean-value': [2, 'always'],

    // Warn when using any/array/object prop type
    'react/forbid-prop-types': [1, {forbid: ['any', 'array']}],

    'react/jsx-one-expression-per-line': 0,

    // disable
    'react/jsx-props-no-spreading': 0,

    'react/static-property-placement': ['error', 'static public field'],

    // Enforce standard order of React component methods and attributes.
    // The order is:
    //   - static methods
    //   - lifecycle methods and attributes (in default rule order, see below)
    //   - miscellaneous helper methods and attributes
    //   - event handler methods (starting with 'on', e.g. 'onClick')
    //   - render helper methods (starting with 'render', e.g. 'renderHeader')
    //   - render
    //
    // Read more about this rule and see the order of lifecycle properties at
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
    'react/sort-comp': [2, {
      order: [
        'static-methods',
        'lifecycle',
        'everything-else',
        '/^on.+$/',
        '/^render.+$/',
        'render',
      ],
    }],

    'react-hooks/rules-of-hooks': 'error',

    // downgrade to warning
    'jsx-a11y/label-has-associated-control': [1, {
      controlComponents: ['Field'],
      depth: 3,
    }],
    // deprecated, replaced with label-has-associated-control
    'jsx-a11y/label-has-for': 0,

    // Turned off since React FSCs with no props (semi-common) need to use this pattern
    'no-empty-pattern': 0,


    // Jest
    'jest/no-try-expect': 0,


    // JSDoc
    'jsdoc/check-alignment': 1,
    'jsdoc/check-examples': 0,
    'jsdoc/check-indentation': 1,
    'jsdoc/check-param-names': 1,
    'jsdoc/check-syntax': 1,
    'jsdoc/check-tag-names': 1,
    'jsdoc/check-types': 1,
    'jsdoc/implements-on-classes': 1,
    'jsdoc/match-description': 0,
    'jsdoc/newline-after-description': 1,
    'jsdoc/no-types': 0,
    'jsdoc/no-undefined-types': 0,
    'jsdoc/require-description': 0,
    'jsdoc/require-description-complete-sentence': 0,
    'jsdoc/require-example': 0,
    'jsdoc/require-hyphen-before-param-description': 1,
    'jsdoc/require-jsdoc': 0,
    'jsdoc/require-param': 0,
    'jsdoc/require-param-description': 0,
    'jsdoc/require-param-name': 1,
    'jsdoc/require-param-type': 1,
    'jsdoc/require-returns': 0,
    'jsdoc/require-returns-check': 0,
    'jsdoc/require-returns-description': 0,
    'jsdoc/require-returns-type': 1,
    'jsdoc/valid-types': 1,
  },
};
