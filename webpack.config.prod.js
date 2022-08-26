const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildDirectory = 'dist';
const pkJson = require('./package.json');

module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, buildDirectory),
        filename: 'js/[name]_' + pkJson.version + '.min.js',
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
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            { test: /\.(ts|tsx)?$/, exclude: ['/node_modules/'], loader: 'ts-loader' },
            {
                test: /\.(s(a|c)ss)$/,
                exclude: ['/node_modules/'],
                use: [
                    MiniCssExtractPlugin.loader,
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, buildDirectory)],
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_' + pkJson.version + '.min.css',
            chunkFilename: 'css/[id]_' + pkJson.version + '.min.css',
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
