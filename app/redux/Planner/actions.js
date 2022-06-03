import {Alert} from 'react-native';

export const SET_USER_TRIPNAME = 'SET_USER_TRIPNAME';
export const SET_USER_STARTDATE = 'SET_USER_STARTDATE';
export const SET_USER_ENDDATE = 'SET_USER_ENDDATE';
export const SET_USER_PAX = 'SET_USER_PAX';
export const SET_USER_BUDGET = 'SET_USER_BUDGET';
export const SET_USER_INTEREST = 'SET_USER_INTEREST';
export const SET_USER_INTEREST_NAME = 'SET_USER_INTEREST_NAME';
export const SET_USER_KIDS = 'SET_USER_KIDS';
export const SET_USER_RENTCAR = 'SET_USER_RENTCAR';
export const SET_USER_RENTHOMESTAY = 'SET_USER_RENTHOMESTAY';
export const SET_USER_LONG_LAT = 'SET_USER_LONG_LAT';
export const SET_USER_DESTINATION = 'SET_USER_DESTINATION';
export const SET_TRIP_ID = 'SET_TRIP_ID';
export const RESET_TRIP = 'RESET_TRIP';
export const SET_TRIP_PLAN = 'SET_TRIP_PLAN';
export const SET_TRIP_PLAN_BY_FIELDNAME = 'SET_TRIP_PLAN_BY_FIELDNAME';

export const setTripId = tripId => dispatch => {
  dispatch({
    type: SET_TRIP_ID,
    payload: tripId,
  });
};

export const setTripName = tripName => dispatch => {
  dispatch({
    type: SET_USER_TRIPNAME,
    payload: tripName,
  });
};

export const setUserLongLat = (long, lat) => dispatch => {
  dispatch({
    type: SET_USER_LONG_LAT,
    payload: {
      long,
      lat,
    },
  });
};

export const setUserDestination = destination => dispatch => {
  dispatch({
    type: SET_USER_DESTINATION,
    payload: destination,
  })
}

export const setStartDate = startDate => dispatch => {
  // check if startDate is not empty
  if (!startDate) {
    Alert.alert('Reminder', 'You must select a start date.', [
      {text: 'OK', onPress: () => {}},
    ]);
    return;
  }
  dispatch({
    type: SET_USER_STARTDATE,
    payload: startDate,
  });
};

export const setEndDate = endDate => dispatch => {
  dispatch({
    type: SET_USER_ENDDATE,
    payload: endDate,
  });
};

export const setPax = pax => dispatch => {
  dispatch({
    type: SET_USER_PAX,
    payload: pax,
  });
};

export const setBudget = budget => dispatch => {
  // preprocess budget string
  let input = budget.replace(/[^0-9.]/g, ''); // remove non numeric characters
  var output = input.split('.');
  output = output.shift() + (output.length ? '.' + output.join('') : '');

  dispatch({
    type: SET_USER_BUDGET,
    payload: output,
  });
};

export const setInterest = interest => dispatch => {
  // check if interests are within max range
  if (interest.length > 5) {
    Alert.alert('Reminder', 'You can only select at most 5 interests.', [
      {text: 'OK', onPress: () => {}},
    ]);
    return;
  }
  dispatch({
    type: SET_USER_INTEREST,
    payload: interest,
  });
};

export const setKids = kids => dispatch => {
  dispatch({
    type: SET_USER_KIDS,
    payload: kids,
  });
};

export const setRentCar = rentCar => dispatch => {
  dispatch({
    type: SET_USER_RENTCAR,
    payload: rentCar,
  });
};

export const setRentHomeStay = rentHomeStay => dispatch => {
  dispatch({
    type: SET_USER_RENTHOMESTAY,
    payload: rentHomeStay,
  });
};

export const setTripPlan = tripPlan => dispatch => {
  dispatch({
    type: SET_TRIP_PLAN,
    payload: tripPlan,
  });
};

export const setTripPlanbyFieldName = (fieldName, data) => dispatch => {
  dispatch({
    type: SET_TRIP_PLAN_BY_FIELDNAME,
    payload: {
      fieldName,
      data,
    },
  });
};

export const resetTrip = () => dispatch => {
  dispatch({
    type: RESET_TRIP,
    payload: {},
  });
};
