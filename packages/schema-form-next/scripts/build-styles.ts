import { mkdirSync, readdirSync, statSync, writeFileSync } from "fs";
import { resolve, basename } from "path";
import { compile } from "sass";

const STYLE_DIR = resolve(__dirname, "../styles");
const STYLE_DIST = resolve(__dirname, "../dist/styles");

const readDirFiles = (path: string) => {
  const filenames = new Set<string>();
  const walk = (p: string) => {
    const files = readdirSync(path);

    files.forEach((file) => {
      const fullPath = resolve(p, file);
      if (statSync(fullPath).isDirectory()) {
        filenames.add(`${fullPath}/`);
        walk(fullPath);
      } else {
        filenames.add(fullPath);
      }
    });
  };

  walk(path);
  return Array.from(filenames);
};

mkdirSync(STYLE_DIST, { recursive: true });

readDirFiles(STYLE_DIR).forEach((p) => {
  const { css } = compile(p);
  if (css) {
    const cssFilename = basename(p).replace(".scss", ".css");
    writeFileSync(resolve(STYLE_DIST, cssFilename), css, {
      encoding: "utf-8",
    });
  }
});
