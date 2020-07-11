# web-ext-webpack-plugin
A webpack plugin for web-ext

## Install

```
npm i -D @ccarruitero/web-ext-webpack-plugin
```

## Usage

In your `webpack.config.js`

```js
const WebExtWebpackPlugin = require('@ccarruitero/web-ext-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    // ...
    new WebExtWebpackPlugin(webExtOptions)
  ]
}
```

## Options

This plugin accepts same `web-ext` available option. Take a look into `web-ext` [command reference](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/).
