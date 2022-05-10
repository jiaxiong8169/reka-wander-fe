
import {
  SET_ROOMS_ADDED,
  SET_TOTAL_PRICE,
  CLEAR_CART,
  SET_HOMESTAY_ID,
} from './actions';
//id, quantity, name
const initialState = {
  roomsAdded: [],
  totalPrice: 0,
  homestayId: '',
};

function homestayReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROOMS_ADDED:
      return {...state, roomsAdded: action.payload};
    case SET_TOTAL_PRICE:
      return {...state, totalPrice: action.payload};
    case SET_HOMESTAY_ID:
      return {...state, homestayId: action.payload};
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
}

export default homestayReducer;
