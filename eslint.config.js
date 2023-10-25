import typescriptParser from "@typescript-eslint/parser";
import { defineFlatConfig } from "eslint-define-config";
import perfectionistNatural from "eslint-plugin-perfectionist/configs/recommended-natural";

// node_modules/eslint-plugin-perfectionist/dist/configs/recommended-natural.mjs
// console.log(JSON.stringify(perfectionistNatural, null, 2));
// console.log(perfectionistNatural);
// console.log(Object.keys(perfectionistNatural));
// console.log(JSON.stringify(perfectionistNatural.rules, null, 2));

export default defineFlatConfig([
  // https://github.com/azat-io/eslint-config/tree/main/typescript
  // https://eslint-plugin-perfectionist.azat.io/configs/recommended-natural
  // https://github.com/azat-io/eslint-plugin-perfectionist/blob/v2.2.0/index.ts#L137
  // https://eslint.org/docs/latest/use/configure/configuration-files-new#using-predefined-configurations
  // https://eslint.org/docs/latest/use/configure/parser
  // https://eslint.org/docs/latest/use/configure/configuration-files-new#configuring-a-custom-parser-and-its-options
  // https://typescript-eslint.io/packages/parser/
  // https://github.com/azat-io/eslint-config/blob/v1.6.0/typescript/index.ts#L12
  // https://github.com/azat-io/eslint-config/blob/v1.6.0/base/index.ts
  // https://eslint.org/docs/latest/use/configure/configuration-files-new#configuration-objects
  // https://nx.dev/recipes/tips-n-tricks/flat-config
  // https://eslint.org/blog/2022/08/new-config-system-part-2/
  // https://github.com/azat-io/eslint-plugin-perfectionist/issues/78
  // https://github.com/eslint-types/eslint-define-config#flat-config
  // https://github.com/sindresorhus/globals
  // https://github.com/sindresorhus/globals/blob/v13.23.0/globals.json#L1207
  {
    files: ["*.ts"],
    languageOptions: {
      parser: typescriptParser,
    },
    ...perfectionistNatural,
  },
  {
    files: ["eslint.config.js"],
    ...perfectionistNatural,
  },
]);
