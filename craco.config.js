/**
 * 自定义主题颜色配置
 */
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'rgb(0,82,204)' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};