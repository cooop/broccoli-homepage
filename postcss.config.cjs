module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 16,
      propList: ["*", "!important"],
      unitPrecision: 5,
      replace: true,
      mediaQuery: false,
      matchMedia: null,
      minPixelValue: 0,
      exclude: /node_modules/i,
    },
  },
};
