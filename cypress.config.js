const { defineConfig } = require("cypress");
const path = require("path");
const gmail = require("gmail-tester");
const fs = require("fs");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin')
  getCompareSnapshotsPlugin(on, config)
  require('cypress-mochawesome-reporter/plugin')(on);
  
  const options = config.env.logTestRunToConsole ?
    {
      printLogsToConsole: 'always',
      outputRoot: config.projectRoot + '/report/logs/',
      outputTarget: {
        'out.txt': 'txt'
      }
    }
    :
    {
      printLogsToConsole: 'never',
      outputRoot: config.projectRoot + '/report/logs/',
      outputTarget: {
        'out.txt': 'txt'
      }
    };
  require('cypress-terminal-report/src/installLogsPrinter')(on, options);

  on('before:browser:launch', (browser = {}, launchOptions) => {
    console.log(
      'launching browser %s is headless? %s',
      browser.name,
      browser.isHeadless,
    )
    // the browser width and height we want to get
    // our screenshots and videos will be of that resolution
    const width = 1440
    const height = 900

    console.log('setting the browser window size to %d x %d', width, height)


    if (browser.isHeadless) {
      launchOptions.args.push(`--window-size=${width},${height}`)
      launchOptions.args.push('--disable-gpu');
      // force screen to be non-retina and just use our given resolution
      launchOptions.args.push('--force-device-scale-factor=1')
    } else {
      launchOptions.args.push(`--window-size=${width + 16},${height + 132}`)

      // force screen to be non-retina and just use our given resolution
      launchOptions.args.push('--force-device-scale-factor=1')
    }

    launchOptions.args.push('--disable-software-rasterizer')

    // IMPORTANT: return the updated browser launch options
    return launchOptions
  })
  on("task", {
    "gmail:check-customer-inbox": async args => {
      const messages = await gmail.check_inbox(
        path.resolve(__dirname, "customer_credentials.json"),
        path.resolve(__dirname, "customer_gmail_token.json"),
        args.options
      );
      return messages;
    },
    "gmail:check-store-inbox": async args => {
      const messages = await gmail.check_inbox(
        path.resolve(__dirname, "store_credentials.json"),
        path.resolve(__dirname, "store_gmail_token.json"),
        args.options
      );
      return messages;
    },
    "unlink": async path => {
      fs.unlink(path, (err) => {
        if (err) throw err;
        //console.log(path + ' was deleted');
      });
      return null;
    },
    checkExist(filename) {
      console.log(filename + ' exist is ' + fs.existsSync(filename))
      return fs.existsSync(filename)
    },
    randomNumber() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const max = 31
          const min = 1
          const n = parseInt((Math.random() * (max - min) + min).toString())
          resolve(n)
        }, 1000)
      })
    }
  
});
    }}
})