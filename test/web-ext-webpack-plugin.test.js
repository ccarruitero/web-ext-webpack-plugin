const path = require('path')

const webpack = require('webpack');
const webExt = require('web-ext').default;

const WebExtWebpackPlugin = require('../index');

class FakeExtensionRunner {
  async reloadAllExtensions() {}

  registerCleanup(fn) {}
}

const getConfig = (opts = {}) => {
  return {
    entry: path.join(__dirname, 'fixtures/app.js'),
    output: {
      filename: 'background.js',
      path: path.join(__dirname, 'fixtures/extension')
    },
    plugins: [
      new WebExtWebpackPlugin(opts)
    ]
  }
}

const run = (opts = {}) => {
  const compiler = webpack(getConfig(opts));
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      resolve(stats);
    })
  });
}

const watch = (opts = {}) => {
  const compiler = webpack(getConfig(opts));
  return new Promise((resolve, reject) => {
    const watching = compiler.watch({}, (err, stats) => {
      if (err) reject(err);
      resolve(watching);
    })
  });
}

describe('WebExtWebpackPlugin', () => {
  describe('web-ext run', () => {
    beforeEach(() => {
      webExt.cmd.run = jest.fn(() => new Promise((resolve) => {
        resolve(new FakeExtensionRunner)
      }));
    });

    afterEach(() => {
      webExt.cmd.run.mockRestore();
    });

    test('when watch call web-ext run', async () => {
      const watching = await watch();
      expect(webExt.cmd.run).toBeCalled();
      watching.close(() => {});
    });

    test('when run dont call web-ext run', async () => {
      await run()
      expect(webExt.cmd.run).not.toBeCalled();
    });

    test('pass given parameters to web-ext', async () => {
      const webExtOpts = {
        sourceDir: 'path/to/extension',
        noReload: true
      }
      const watching = await watch(webExtOpts);
      expect(webExt.cmd.run).toBeCalledWith(webExtOpts);
      watching.close(() => {});
    });
  });
});
