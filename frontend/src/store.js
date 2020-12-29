import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import { persistStore } from 'redux-persist5';
import { persistReducer } from 'redux-persist5';
import { createMigrate } from 'redux-persist5';
// import storage from 'redux-persist5/lib/storage';
import localforage from 'localforage';
import autoMergeLevel2 from 'redux-persist5/lib/stateReconciler/autoMergeLevel2';

const migrations = {
  0: (state) => {
    // migration clear out device state
    return {
      ...state,
      device: undefined,
    };
  },
  1: (state) => {
    // migration to keep only device state
    return {
      device: state.device,
    };
  },
};

const persistConfig = {
  key: 'root',
  storage: localforage,
  version: 1,
  debug: true,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const inititalState = {};

const store = createStore(
  persistedReducer,
  inititalState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

let persistor = persistStore(store);

export { store, persistor };
