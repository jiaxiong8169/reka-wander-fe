export const SET_ATTRACTIONS = 'SET_ATTRACTIONS';
export const SET_HOTELS = 'SET_HOTELS';
export const SET_RESTAURANTS = 'SET_RESTAURANTS';
export const SET_NEARBY_ATTRACTIONS = 'SET_NEARBY_ATTRACTIONS';
export const SET_NEARBY_HOTELS = 'SET_NEARBY_HOTELS';
export const SET_NEARBY_RESTAURANTS = 'SET_NEARBY_RESTAURANTS';
export const SET_INTERESTS = 'SET_INTERESTS';

export const setAttractions = attractions => dispatch => {
  dispatch({
    type: SET_ATTRACTIONS,
    payload: attractions,
  });
};

export const setHotels = hotels => dispatch => {
  dispatch({
    type: SET_HOTELS,
    payload: hotels,
  });
};

export const setRestaurants = restaurants => dispatch => {
  dispatch({
    type: SET_RESTAURANTS,
    payload: restaurants,
  });
};

export const setNearbyAttractions = nearbyAttractions => dispatch => {
  dispatch({
    type: SET_NEARBY_ATTRACTIONS,
    payload: nearbyAttractions,
  });
};

export const setNearbyHotels = nearbyHotels => dispatch => {
  dispatch({
    type: SET_NEARBY_HOTELS,
    payload: nearbyHotels,
  });
};

export const setNearbyRestaurants = nearbyRestaurants => dispatch => {
  dispatch({
    type: SET_NEARBY_RESTAURANTS,
    payload: nearbyRestaurants,
  });
};

export const setInterests = interests => dispatch => {
  dispatch({
    type: SET_INTERESTS,
    payload: interests,
  });
};
