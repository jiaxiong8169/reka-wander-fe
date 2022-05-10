
export const SET_ROOMS_ADDED = 'SET_ROOMS_ADDED';
export const SET_TOTAL_PRICE = 'SET_TOTAL_PRICE';
export const CLEAR_CART = 'CLEAR_CART';
export const SET_HOMESTAY_ID = 'SET_HOMESTAY_ID';

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