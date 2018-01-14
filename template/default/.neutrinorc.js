module.exports = {
  use: [
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'neutrino-create-project',
          appMountId: 'app',
          bodyHtmlSnippet:
            '<noscript>For full functionality of this site it is necessary to enable JavaScript. Here are the <a href="https://www.enable-javascript.com/" target="_blank"> instructions how to enable JavaScript in your web browser</a>.</noscript>',
        },
      },
    ],
    '@neutrinojs/jest',
  ],
}
