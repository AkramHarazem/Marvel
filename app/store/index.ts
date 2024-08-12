import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {api} from '../services/api';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';
import logger from 'redux-logger';
import {appSettingsReduce} from '@slices/appSettingsSlices';
// import secureStorage from '../common/secureStorage';

const storage = new MMKV();

export const reduxStorage = {
  setItem: (key: string, value: boolean | string | number | Uint8Array) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

// const authPersistConfig = {
//   key: 'auth',
//   storage: secureStorage,
//   whitelist: ['token'],
//   throttle: 30,
// };

const reducers = combineReducers({
  api: api.reducer,
  settings: appSettingsReduce,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const defaultMiddleWares = [api.middleware];
    if (__DEV__) {
      const createDebugger = require('redux-flipper').default;
      defaultMiddleWares.push(logger);
      defaultMiddleWares.push(createDebugger());
    }
    const middleWares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(defaultMiddleWares);

    return middleWares;
  },
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export default store;
