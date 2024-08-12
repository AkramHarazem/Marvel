import secureStorage from './secureStorage';
import * as colors from './colors';
import typo from './typo';
import * as fonts from './fonts';
import * as types from './types';
import * as constants from './constants';
import screensConfig from './screensConfig';
import * as utils from './utils';

module.exports = {
  secureStorage,
  ...colors,
  typo,
  ...fonts,
  ...types,
  ...constants,
  screensConfig,
  ...utils,
};
