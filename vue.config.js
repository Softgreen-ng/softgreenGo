module.exports = {
    configureWebpack: {
      externals: {
        Vue: "vue"
      }
    },
    pwa: {
      manifestOptions: {
        name: "App Name",
        short_name: "Short Name",
        start_url: "./",
        display: "standalone",
        theme_color: "#000000",
        icons: [
          {
            src: "./favicon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
  
      themeColor: "#4DBA87",
      msTileColor: "#000000",
      appleMobileWebAppCapable: "yes",
      appleMobileWebAppStatusBarStyle: "black",
      iconPaths: {
        maskicon: null,
        favicon32: "./favicon32.png",
        favicon16: "./favicon16.png",
        appleTouchIcon: null,
        msTileImage: null,
      },
      // configure the workbox plugin
      workboxPluginMode: "GenerateSW",
    },
};