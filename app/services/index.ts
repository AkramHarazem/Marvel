import {api} from './api';
import {charactersApi} from './characters';

module.exports = {
  ...charactersApi,
  api,
};
