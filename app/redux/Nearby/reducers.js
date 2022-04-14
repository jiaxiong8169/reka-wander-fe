import {SET_ATTRACTIONS, SET_HOTELS, SET_RESTAURANTS} from './actions';

export const initialState = {
  attractions: [],
  hotels: [],
  restaurants: [],
};

function nearbyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ATTRACTIONS:
      return {...state, attractions: action.payload};
    case SET_HOTELS:
      return {...state, hotels: action.payload};
    case SET_RESTAURANTS:
      return {...state, restaurants: action.payload};
    default:
      return state;
  }
}

export default nearbyReducer;
