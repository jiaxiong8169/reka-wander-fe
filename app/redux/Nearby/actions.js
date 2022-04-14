export const SET_ATTRACTIONS = 'SET_ATTRACTIONS';
export const SET_HOTELS = 'SET_HOTELS';
export const SET_RESTAURANTS = 'SET_RESTAURANTS';

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
