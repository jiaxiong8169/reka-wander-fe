export const SET_USER_PICKUP_DATE = 'SET_USER_PICKUP_DATE';
export const SET_USER_PICKUP_TIME = 'SET_USER_PICKUP_TIME';
export const SET_USER_RETURN_DATE = 'SET_USER_RETURN_DATE';
export const SET_USER_RETURN_TIME = 'SET_USER_RETURN_TIME';
export const SET_CAR_LOCATION = 'SET_CAR_LOCATION';
export const SET_CAR_TOTAL_PRICE = 'SET_CAR_TOTAL_PRICE';
export const RESET_CAR_INFO = 'RESET_TRIP';

export const setPickupDate = pickUpDate => dispatch => {
  dispatch({
    type: SET_USER_PICKUP_DATE,
    payload: pickUpDate,
  });
};

export const setPickupTime = pickUpTime => dispatch => {
  dispatch({
    type: SET_USER_PICKUP_TIME,
    payload: pickUpTime,
  });
};

export const setReturnDate = returnDate => dispatch => {
  dispatch({
    type: SET_USER_RETURN_DATE,
    payload: returnDate,
  });
};

export const setReturnTime = returnTime => dispatch => {
  dispatch({
    type: SET_USER_RETURN_TIME,
    payload: returnTime,
  });
};

export const setCarPrice = carPrice => dispatch => {
  dispatch({
    type: SET_CAR_TOTAL_PRICE,
    payload: carPrice,
  });
};

export const setCarLocation = carLocation => dispatch => {
  dispatch({
    type: SET_CAR_LOCATION,
    payload: carLocation,
  });
};

export const resetCarInfo = () => dispatch => {
    dispatch({
      type: RESET_CAR_INFO,
      payload: {},
    });
  };

