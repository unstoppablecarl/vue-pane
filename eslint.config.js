import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default tseslint.config(
  { ignores: ['dist', 'example'] },

  eslint.configs.recommended,
  tseslint.configs.recommended,
  pluginVue.configs['flat/recommended'],

  // TypeScript parser for Vue script blocks + browser globals
  {
    files: ['**/*.vue', '**/*.ts'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      // TypeScript handles undefined-variable checking — no-undef produces
      // false positives for browser types (HTMLElement, TransitionEvent, etc.)
      'no-undef': 'off',
    },
  },

  stylistic.configs.customize({
    semi: false,
    quotes: 'single',
    indent: 2,
    commaDangle: 'always-multiline',
    braceStyle: '1tbs',
  }),

  {
    rules: {
      'vue/multi-word-component-names': 'off',
      // Optional props without defaults are fine when TypeScript types them
      'vue/require-default-prop': 'off',
      // Compact math expressions are readable without forcing one statement per line
      '@stylistic/max-statements-per-line': 'off',
      // _ prefix marks intentionally unused variables (e.g. future API props)
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    },
  },
)
