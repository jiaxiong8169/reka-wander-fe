
export const SET_ROOMS_ADDED = 'SET_ROOMS_ADDED';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_HOMESTAY_ID = 'SET_HOMESTAY_ID';
export const SET_CHECKIN_DATE = 'SET_CHECKIN_DATE';
export const SET_CHECKOUT_DATE = 'SET_CHECKOUT_DATE';
export const SET_HOMESTAY_NAME =  'SET_HOMESTAY_NAME';
export const SET_HOMESTAY_LOCATION = 'SET_HOMESTAY_LOCATION';
export const SET_HOMESTAY_LAT = 'SET_HOMESTAY_LAT';
export const SET_HOMESTAY_LONG ='SET_HOMESTAY_LONG';
export const SET_HOMESTAY_DATA = 'SET_HOMESTAY_DATA';

export const setRoomsAdded = roomAdded => dispatch => {
  dispatch({
    type: SET_ROOMS_ADDED,
    payload: roomAdded,
  });
};

export const setHomestayId = homestayId => dispatch => {
  dispatch({
    type: SET_HOMESTAY_ID,
    payload: homestayId,
  });
};

export const setTotalPrice = totalPrice => dispatch => {
  dispatch({
    type: SET_TOTAL_PRICE,
    payload: totalPrice,
  });
};

export const clearCart = () => dispatch => {
  dispatch({
    type: CLEAR_CART,
    payload: {},
  });
};

export const setCheckInDate = checkInDate => dispatch => {
  dispatch({
    type: SET_CHECKIN_DATE,
    payload: checkInDate,
  });
};

export const setCheckOutDate = checkOutDate => dispatch => {
  dispatch({
    type: SET_CHECKOUT_DATE,
    payload: checkOutDate,
  });
};

export const setHomestayName = homestayName => dispatch => {
  dispatch({
    type: SET_HOMESTAY_NAME,
    payload: homestayName,
  });
};

export const setHomestayLat = lat => dispatch => {
  dispatch({
    type: SET_HOMESTAY_LAT,
    payload: lat,
  });
};

export const setHomestayLong = long => dispatch => {
  dispatch({
    type: SET_HOMESTAY_LONG,
    payload: long,
  });
};

export const setHomestayLocation = homestayLocation => dispatch => {
  dispatch({
    type: SET_HOMESTAY_LOCATION,
    payload: homestayLocation,
  });
};

export const setHomestayData = homestayData => dispatch => {
  dispatch({
    type: SET_HOMESTAY_DATA,
    payload: homestayData,
  })
}