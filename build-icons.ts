// https://github.com/vuejs/vitepress/blob/v1.0.0-rc.22/src/client/theme-default/support/socialIcons.ts
// https://github.com/vuejs/vitepress/blob/v1.0.0-rc.23/src/client/theme-default/support/socialIcons.ts
// https://nodejs.org/api/fs.html#fspromisesreaddirpath-options
// https://github.com/unjs/jiti/issues/72
// https://nodejs.org/api/fs.html#fspromisesreadfilepath-options

import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const INPUT_PATH: string = resolve(
  __dirname,
  "node_modules/social-media-icons/icons",
);

async function main() {
  try {
    const files = await readdir(INPUT_PATH, { encoding: "utf8" });

    for (const file of files) {
      const filePath = resolve(INPUT_PATH, file);
      // console.log(filePath);

      const svgString = await readFile(filePath, { encoding: "utf8" });
      // console.log(svgString);
    }
  } catch (err) {
    console.error(err);
  }
}

main();
