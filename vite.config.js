/**
 * @type {import('vite').UserConfig}
 */
const gameName = "bombrain";

const config = {
  root: `./src/${gameName}/`,
  base: "./",
  build: {
    outDir: `../../docs/build/${gameName}/`,
    emptyOutDir: true,
  },
};

export default config;
