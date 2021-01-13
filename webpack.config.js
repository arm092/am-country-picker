const is_production = process.env.NODE_ENV === "production";
const path = require('path');

module.exports = {
    entry: "./src/js/AmcPicker.js",
    cache: true,
    output: {
        path: path.join(__dirname, './dist/'),
        // filename: '[name].js',
        filename: 'amcpicker.js',
        libraryTarget: "umd",
    },
    devtool: is_production ? false : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.mustache|html$/,
                use: ['mustache-loader']
            }
        ]
    },
}