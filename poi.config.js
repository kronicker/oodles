const rules = [{
  test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
  loader: 'imports-loader?jQuery=jquery'
}];

const port = process.env.PORT || 3000;
const devServer = {
  proxy: { '/': `http://localhost:${port}` }
};

module.exports = options => ({
  entry: [
    require.resolve('bootstrap-loader'),
    'client/main.js'
  ],
  preset: [
    require('poi-preset-buble')(),
    require('poi-preset-eslint')({ mode: '*' })
  ],
  html: {
    template: 'client/index.html',
    inject: true
  },
  extractCss: true,
  sourceMap: options.mode === 'development',
  copy: { from: 'client/assets', to: 'assets' },
  webpack(config) {
    config.module.rules.push(...rules);
    return config;
  },
  devServer
});
