var path = require('path');

module.exports = {
  devTool: '#source-map',
  entry: {
  	app: path.resolve(__dirname, 'src/client/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader", query: { presets: ['es2015', 'react'] } },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /jquery/, loader: 'expose?$!expose?jQuery' },
      {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
          loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  }
};
