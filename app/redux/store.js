import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer, createMigrate} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initialState} from './Nearby/reducers';
import thunk from 'redux-thunk';
import plannerReducer from './Planner/reducers';
import nearbyReducer from './Nearby/reducers';

const MIGRATION_DEBUG = false;

const migrations = {
  4: state => {
    return {...state, nearbyReducer: initialState};
  },
};

const persistConfig = {
  key: 'root',
  version: 4,
  migrate: createMigrate(migrations, {debug: MIGRATION_DEBUG}),
  storage: AsyncStorage,
  whitelist: ['nearbyReducer'], // which reducer want to store in async storage
};

const reducers = combineReducers({
  plannerReducer,
  nearbyReducer,
});
const persistedReducers = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducers, applyMiddleware(thunk));

export const persistor = persistStore(store);
