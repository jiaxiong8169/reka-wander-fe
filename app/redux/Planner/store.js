import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import plannerReducer from './reducers';

const rootReducer = combineReducers({plannerReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));