const path = require("path");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                loader: "babel-loader",
                options: {
                    presets: ["es2015"]
                }
            },
            {
                test: /\.html/,
                loader: "raw-loader"
            },
            {
                test: /\.css/,
                loader: "raw-loader"
            }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: "localhost",
            port: 3000,
            server: {
                baseDir: ['./']
            }
        })
    ]
}