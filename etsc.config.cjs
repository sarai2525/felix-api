module.exports = {
  tsConfigFile: 'tsconfig.json',
  esbuild: {
    minify: true,
    target: 'ES2021'
  },
  assets: {
    baseDir: '.',
    filePatterns: ['**/*.{json,yaml}', '!node_modules']
  }
}
