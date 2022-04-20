import {
  SET_USER_TRIPNAME,
  SET_USER_STARTDATE,
  SET_USER_ENDDATE,
  SET_USER_PAX,
  SET_USER_BUDGET,
  SET_USER_INTEREST,
  SET_USER_KIDS,
  SET_USER_RENTCAR,
  SET_USER_RENTHOMESTAY,
  SET_USER_LONGITUDE,
  SET_USER_LATITUDE,
  SET_TRIP_ID,
  RESET_TRIP,
} from './actions';

const initialState = {
  tripId: '',
  tripName: '',
  startDate: '',
  endDate: '',
  pax: 0,
  budget: '',
  interest: [],
  kids: true,
  rentCar: true,
  rentHomeStay: true,
  longitude: 0,
  latitude: 0,
};

function plannerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRIP_ID:
      return {...state, tripId: action.payload};
    case SET_USER_TRIPNAME:
      return {...state, tripName: action.payload};
    case SET_USER_STARTDATE:
      return {...state, startDate: action.payload};
    case SET_USER_ENDDATE:
      return {...state, endDate: action.payload};
    case SET_USER_PAX:
      return {...state, pax: action.payload};
    case SET_USER_BUDGET:
      return {...state, budget: action.payload};
    case SET_USER_INTEREST:
      return {...state, interest: action.payload};
    case SET_USER_KIDS:
      return {...state, kids: action.payload};
    case SET_USER_RENTCAR:
      return {...state, rentCar: action.payload};
    case SET_USER_RENTHOMESTAY:
      return {...state, rentHomeStay: action.payload};
    case SET_USER_LONGITUDE:
      return {...state, longitude: action.payload};
    case SET_USER_LATITUDE:
      return {...state, latitude: action.payload};
    case RESET_TRIP:
      return initialState;
    default:
      return state;
  }
}

export default plannerReducer;
