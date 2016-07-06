module.exports = {
  entry: './script.js',
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query:
          {
            presets:['react', 'es2015']
          }
      }
    ]
  }
}
