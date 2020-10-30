const path = require("path");

module.exports = {
    context: __dirname,
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.map.js$/,
                use: {
                    loader: "source-map-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    node: {
        global: true
    }
};