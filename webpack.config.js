var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: [
        './index.js',
        './app/styles/main.scss'
    ],
    output: {
        filename: 'bundle.js',
        path: './public/'
    },
    devtool: 'inline-source-map',
    module: {
        preLoaders: [
            // Add linters
        ],
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract([ 'css-loader?sourceMap', 'autoprefixer'])},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract(['css-loader?sourceMap', 'autoprefixer', 'sass-loader?sourceMap']), exclude: /node_modules/},
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