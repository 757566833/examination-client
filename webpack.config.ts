import webpack from 'webpack';
import {merge, mergeWithCustomize} from 'webpack-merge';
import commonConfig from './webpack/webpack.common';
import {developmentConfig, developmentHotConfig} from './webpack/webpack.dev';
import {productionConfig} from './webpack/webpack.prod';

const config: webpack.ConfigurationFactory = (env) => {
  console.log(env);
  switch (env) {
    case 'development':
      return mergeWithCustomize({
        customizeObject(pre, next, key) {
          if (key == 'module') {
            const nextModule = {...pre};
            nextModule.rules[0] = next.rules[0];
            return nextModule;
          }
        },
      })(merge(commonConfig, developmentConfig), developmentHotConfig);
    case 'production':
      return merge(commonConfig, productionConfig);
    default:
      throw new Error('No matching configuration was found!');
  }
};
export default config;
