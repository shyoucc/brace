var path = require( "path" )
var webpack = require( 'webpack' )
module.exports = {
    entry: {
        app: ['./src/brace.js']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
