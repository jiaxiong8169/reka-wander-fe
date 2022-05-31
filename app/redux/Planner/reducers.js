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
  SET_TRIP_ID,
  RESET_TRIP,
  SET_TRIP_PLAN,
  SET_TRIP_PLAN_BY_FIELDNAME,
  SET_USER_LONG_LAT,
} from './actions';
import moment from 'moment';

const initialState = {
  tripId: '',
  tripName: 'My Trip',
  startDate: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
  endDate: moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]'),
  pax: 1,
  budget: '0.0',
  interest: [],
  kids: true,
  rentCar: true,
  rentHomeStay: true,
  longitude: 0,
  latitude: 0,
  tripPlan: {
    days: 0,
    hours: 0,
    previousBudget: 0,
    attractionObjects: [],
    attractions: [],
    restaurantObjects: [],
    restaurants: [],
    hotelObjects: [],
    hotels: [],
    vehicleObjects: [],
    vehicles: [],
    homestays: [],
    homestayObjects: [],
  },
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
    case SET_TRIP_PLAN:
      return {...state, tripPlan: action.payload};
    case SET_USER_LONG_LAT:
      return {
        ...state,
        longitude: action.payload.long,
        latitude: action.payload.lat,
      };
    case SET_TRIP_PLAN_BY_FIELDNAME:
      return {
        ...state,
        tripPlan: {
          ...state.tripPlan,
          [action.payload.fieldName]: action.payload.data,
        },
      };
    case RESET_TRIP:
      return initialState;
    default:
      return state;
  }
}

export default plannerReducer;
