import {
  SET_USER_PICKUP_DATE,
  SET_USER_PICKUP_TIME,
  SET_USER_RETURN_DATE,
  SET_USER_RETURN_TIME,
  SET_CAR_LOCATION,
  SET_CAR_TOTAL_PRICE,
  RESET_CAR_INFO,
} from './actions';

const initialState = {
  pickUpDate: '',
  pickUpTime: '',
  returnDate: '',
  returnTime: '',
  carLocation: '',
  carPrice: null,
};

function carReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_PICKUP_DATE:
      return {...state, pickUpDate: action.payload};
    case SET_USER_PICKUP_TIME:
      return {...state, pickUpTime: action.payload};
    case SET_USER_RETURN_DATE:
      return {...state, returnDate: action.payload};
    case SET_USER_RETURN_TIME:
      return {...state, returnTime: action.payload};
    case SET_CAR_LOCATION:
      return {...state, carLocation: action.payload};
    case SET_CAR_TOTAL_PRICE:
      return {...state, carPrice: action.payload};
    case RESET_CAR_INFO:
      return initialState;
    default:
      return state;
  }
}

export default carReducer;
