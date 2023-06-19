const path = require('path');

const buildCommand = (filenames) => {
  const files = filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ');

  return [
    `prettier --write ${files}`,
    `xo --fix ${files}`,
    //TODO: Reconsider to testing each files on git staged `vitest run related ${files}`
  ];
}

module.exports = {
  'src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}': buildCommand,
};
