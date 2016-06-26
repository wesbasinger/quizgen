module.exports = {
  entry: './app-client.js',
  output: {
    filename: "public/client.min.js"
  },
  module: {
    loaders: [
      {
        exclude: /(node_modules|app-server.js|route-spec.js)/,
        loader: 'babel',
        query:
          {
            presets:['react']
          }
      }
    ]
  }
}
