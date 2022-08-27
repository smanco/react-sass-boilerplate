const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildDirectory = 'dist';
const pkJson = require('./package.json');

module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, buildDirectory),
        filename: './assets/js/[name]_' + pkJson.version + '.min.js',
        chunkFilename: './assets/js/[name].min.js',
        assetModuleFilename: './assets/images/css/[name][ext][query]',
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
    stats: 'errors-only',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, buildDirectory)],
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name]_' + pkJson.version + '.min.css',
            chunkFilename: 'assets/css/[id]_' + pkJson.version + '.min.css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, 'src' + process.env.THEME_IMAGES_PATH) + process.env.SKIN,
                    to: path.join(__dirname, buildDirectory + process.env.THEME_IMAGES_PATH),
                },
                {
                    from: path.join(__dirname, 'src' + process.env.COMMON_IMAGES_PATH),
                    to: path.join(__dirname, buildDirectory + process.env.COMMON_IMAGES_PATH),
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};
