import {
  SET_ATTRACTIONS,
  SET_HOTELS,
  SET_NEARBY_ATTRACTIONS,
  SET_NEARBY_HOTELS,
  SET_NEARBY_RESTAURANTS,
  SET_RESTAURANTS,
  SET_INTERESTS,
} from './actions';

export const initialState = {
  attractions: [],
  hotels: [],
  restaurants: [],
  nearbyAttractions: [],
  nearbyHotels: [],
  nearbyRestaurants: [],
  interests: [],
};

function nearbyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ATTRACTIONS:
      return {...state, attractions: action.payload};
    case SET_HOTELS:
      return {...state, hotels: action.payload};
    case SET_RESTAURANTS:
      return {...state, restaurants: action.payload};
    case SET_NEARBY_ATTRACTIONS:
      return {...state, nearbyAttractions: action.payload};
    case SET_NEARBY_HOTELS:
      return {...state, nearbyHotels: action.payload};
    case SET_NEARBY_RESTAURANTS:
      return {...state, nearbyRestaurants: action.payload};
    case SET_INTERESTS:
      return {...state, interests: action.payload};
    default:
      return state;
  }
}

export default nearbyReducer;
