// https://github.com/vuejs/vitepress/blob/v1.0.0-rc.22/src/client/theme-default/support/socialIcons.ts
// https://github.com/vuejs/vitepress/blob/v1.0.0-rc.23/src/client/theme-default/support/socialIcons.ts
// https://nodejs.org/api/fs.html#fspromisesreaddirpath-options
// https://github.com/unjs/jiti/issues/72
// https://nodejs.org/api/fs.html#fspromisesreadfilepath-options

import { readFile, readdir, writeFile } from "node:fs/promises";
import { parse, resolve } from "node:path";
import { format } from "prettier";
import {
  ListFormat,
  NewLineKind,
  NodeFlags,
  ScriptKind,
  ScriptTarget,
  createPrinter,
  createSourceFile,
  factory,
} from "typescript";

interface IconDeclaration {
  name: string;
  svgString: string;
}

const INPUT_PATH: string = resolve(
  __dirname,
  "node_modules/social-media-icons/icons",
);

const OUTPUT_FILENAME: string = "index.ts";
const OUTPUT_PATH: string = resolve(__dirname, "src", OUTPUT_FILENAME);

// https://www.peterp.me/articles/async-await-reduce-function/
// https://www.amitmerchant.com/reduce-array-of-objects-to-an-object-in-javascript/
async function prepareIcons(
  accPromise: Promise<IconDeclaration[]>,
  currentFile: string,
): Promise<IconDeclaration[]> {
  const accumulator = await accPromise;

  const filePath = resolve(INPUT_PATH, currentFile);
  const fileName = parse(currentFile).name;
  // console.log(filePath);

  const svgString = await readFile(filePath, { encoding: "utf8" });
  // console.log(svgString);

  const newIcon: IconDeclaration = {
    name: fileName,
    svgString,
  };

  return [...accumulator, newIcon];
}

async function main() {
  try {
    const files: string[] = await readdir(INPUT_PATH, { encoding: "utf8" });

    const icons: IconDeclaration[] = await files.reduce(
      prepareIcons,
      Promise.resolve([]),
    );
    // console.log(icons);

    // https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#creating-and-printing-a-typescript-ast
    // https://nabeelvalley.co.za/docs/javascript/typescript-ast/
    // https://ts-ast-viewer.com/
    // https://kinda-silly-blog.vercel.app/posts/typescript-compiler-api
    // https://learning-notes.mistermicheels.com/javascript/typescript/compiler-api/#programmatically-creating-ast-nodes
    const iconsVariable = factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier("icons"),
            undefined,
            undefined,
            factory.createAsExpression(
              factory.createObjectLiteralExpression(
                icons.map(({ name, svgString }) =>
                  factory.createPropertyAssignment(
                    factory.createIdentifier(name),
                    factory.createStringLiteral(svgString, true),
                  ),
                ),
                true,
              ),
              factory.createTypeReferenceNode(
                factory.createIdentifier("const"),
                undefined,
              ),
            ),
          ),
        ],
        NodeFlags.Const,
      ),
    );
    const iconsExport = factory.createExportAssignment(
      undefined,
      undefined,
      factory.createIdentifier("icons"),
    );

    // https://stackoverflow.com/a/69240365 (factory.createIdentifier("\n"))
    const nodes = factory.createNodeArray([
      iconsVariable,
      factory.createIdentifier("\n"), // Workaround
      iconsExport,
    ]);

    const resultFile = createSourceFile(
      OUTPUT_FILENAME,
      "",
      ScriptTarget.ESNext,
      false,
      ScriptKind.TS,
    );

    const printer = createPrinter({ newLine: NewLineKind.LineFeed });
    const result = printer.printList(ListFormat.MultiLine, nodes, resultFile);
    // console.log(result);

    const formattedResult = await format(result, { parser: "typescript" });

    await writeFile(OUTPUT_PATH, formattedResult);
  } catch (err) {
    console.error(err);
  }
}

main();
