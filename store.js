import AsyncStorage from '@react-native-community/async-storage';
//import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware  } from "redux";
import { persistStore, persistReducer } from 'redux-persist';

import combineReducers from './reducers/index';

// Middleware: Redux Persist Config
const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
      //'authReducer',
      'signUp',
        'login',
        'wihdraw',
        'screen',
        'wallet'
    ]
  };

const persistedReducer = persistReducer(persistConfig, combineReducers);

const store=createStore(
    persistedReducer,
    applyMiddleware()
    );

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export {
    store,
    persistor,
  };