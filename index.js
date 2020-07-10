const webExt = require('web-ext').default;

const pluginName = 'WebExtWebpackPlugin'

class WebExtWebpackPlugin {
  constructor(webExtOptions = {}) {
    this.webExtOptions = Object.assign({ noReload: true }, webExtOptions);
    this.runner = null;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise(pluginName, async (compilation) => {
      if (this.runner) {
        this.runner.reloadAllExtensions();
        return;
      }

      await webExt.cmd.run(this.webExtOptions)
        .then((runner) => this.runner = runner);

      this.runner.registerCleanup(() => {
        this.runner = null;
      });
    });
  }
}

module.exports = WebExtWebpackPlugin;
