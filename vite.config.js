/**
 * @type {import('vite').UserConfig}
 */
const gameName = "jumpandlaser";

const config = {
  root: `./src/${gameName}/`,
  base: "./",
  build: { outDir: `../../docs/build/${gameName}/` },
};

export default config;
