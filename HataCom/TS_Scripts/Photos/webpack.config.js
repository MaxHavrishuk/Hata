const path = require('path');

module.exports = {

    // Building mode
    mode: 'development',

    // Entry point of the application
    entry: './PhotosMain.ts',

    // Target application
    output: {
        path: path.resolve(__dirname, '../../Scripts/CustomScripts'),
        filename: 'Photos.js'
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    optimization: {
        minimize: true
    }
};