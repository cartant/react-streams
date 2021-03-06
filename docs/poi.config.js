const path = require("path")

module.exports = {
  entry: "./docs/index.js",
  configureWebpack(config, context) {
    config.resolve.alias = {
      "react-streams": "../../"
    }
    config.module.rules.push({
      test: /\.md?$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              "env",
              ["@babel/preset-stage-0", { decoratorsLegacy: true }],
              "@babel/react"
            ]
          }
        },
        "@mdx-js/loader"
      ]
    })

    return config
  }
}
