var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: './public/'
    },
    devtool: 'source-map',
    module: {
        preLoaders: [
            // Add linters
        ],
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract([ 'css-loader'])},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']), exclude: /node_modules/},
            {test: /\.html$/, loader: 'raw'}
        ]
    },
    devServer: {
        contentBase: './public/'
    },
    plugins: [
        new ExtractTextPlugin('bundle.css')
    ]
};