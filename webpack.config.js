const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const buildDirectory = 'dist';
module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: 'eval-source-map',
    output: {
        path: path.join(__dirname, buildDirectory),
        filename: 'bundle.js',
        assetModuleFilename: 'images/[hash][ext][query]',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@styles': path.resolve(process.cwd(), './src/sass'),
            '@ui': path.resolve(process.cwd(), './src/ui'),
            '@pages': path.resolve(process.cwd(), './src/layout/pages'),
            '@components': path.resolve(process.cwd(), './src/layout/components'),
            '@store': path.resolve(process.cwd(), './src/state/store'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: ['/node_modules/'],
                use: ['babel-loader'],
            },
            { test: /\.(ts|tsx)?$/, exclude: ['/node_modules/'], loader: 'ts-loader' },
            {
                test: /\.(s(a|c)ss)$/,
                exclude: ['/node_modules/'],
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: '@import "./themes/' + process.env.SKIN + '/_variables";',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|png|jpg|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8192,
                    },
                },
            },
        ],
    },
    devServer: {
        port: 3001,
        open: true,
        static: path.resolve(__dirname, './dist'),
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, buildDirectory)],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
