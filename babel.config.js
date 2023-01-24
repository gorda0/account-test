module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@assets": "./assets",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@contexts": "./src/contexts",
          "@navigation": "./src/navigation",
          "@store": "./src/store",
          "@templates": "./src/templates",
          "@utils": "./src/utils",
          "@models": "./src/models",
          "@constants": "./src/constants",
          "@hooks": "./src/hooks",
        },
      },
    ],
  ],
};
