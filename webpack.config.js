const path = require('path');

module.exports = {
  entry: './src/geektrust.ts', // Entry point of your application
  output: {
    filename: 'geektrust.js', // Name of the output file
    path: path.resolve(__dirname), // Output directory
    libraryTarget: 'commonjs2' // This makes the bundle compatible with Node.js
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  stats: {
    all: false,
    assets: false,
    errors: true,
    warnings: true,
    modules: false,
    entrypoints: false,
  },
  mode: 'production' // Change to 'development' for non-minified output
};
