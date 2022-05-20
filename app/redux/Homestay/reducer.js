import {
  SET_ROOMS_ADDED,
  SET_TOTAL_PRICE,
  CLEAR_CART,
  SET_HOMESTAY_ID,
  SET_CHECKIN_DATE,
  SET_CHECKOUT_DATE,
  SET_HOMESTAY_NAME,
  SET_HOMESTAY_LOCATION,
  SET_HOMESTAY_LAT,
  SET_HOMESTAY_LONG,
  SET_HOMESTAY_DATA,
} from './actions';
//id, quantity, name
const initialState = {
  roomsAdded: [],
  totalPrice: 0,
  homestayId: '',
  checkInDate: new Date(),
  checkOutDate: new Date(),
  homestayName: '',
  homestayLocation: '',
  homestayData: [],
};

function homestayReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROOMS_ADDED:
      return {...state, roomsAdded: action.payload};
    case SET_TOTAL_PRICE:
      return {...state, totalPrice: action.payload};
    case SET_HOMESTAY_ID:
      return {...state, homestayId: action.payload};
    case SET_CHECKIN_DATE:
      return {...state, checkInDate: action.payload};
    case SET_CHECKOUT_DATE:
      return {...state, checkOutDate: action.payload};
    case SET_HOMESTAY_NAME:
      return {...state, homestayName: action.payload};
    case SET_HOMESTAY_LOCATION:
      return {...state, homestayLocation: action.payload};
    case SET_HOMESTAY_LAT:
      return {...state, lat: action.payload};
    case SET_HOMESTAY_LONG:
      return {...state, long: action.payload};
      case SET_HOMESTAY_DATA:
        return {...state, homestayData: action.payload};
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
}

export default homestayReducer;
