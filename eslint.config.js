import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    ...[tseslint.configs.recommended, ...tseslint.configs.stylistic].map((config) => ({
        ...config,
        files: ['**/*.{ts,tsx,mts,cts}'],
        rules: {
            '@typescript-eslint/consistent-type-definitions': 'off'
        }
    })),
    ...[eslintPluginPrettierRecommended]
];
