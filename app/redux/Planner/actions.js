export const SET_USER_TRIPNAME = 'SET_USER_TRIPNAME';
export const SET_USER_STARTDATE = 'SET_USER_STARTDATE';
export const SET_USER_ENDDATE = 'SET_USER_ENDDATE';
export const SET_USER_PAX = 'SET_USER_PAX';
export const SET_USER_BUDGET = 'SET_USER_BUDGET';
export const SET_USER_INTEREST = 'SET_USER_INTEREST';
export const SET_USER_KIDS = 'SET_USER_KIDS';
export const SET_USER_RENTCAR = 'SET_USER_RENTCAR';
export const SET_USER_RENTHOMESTAY = 'SET_USER_RENTHOMESTAY';
export const SET_USER_LONGITUDE = 'SET_USER_LONGITUDE';
export const SET_USER_LATITUDE = 'SET_USER_LATITUDE';

export const setTripName = tripName => dispatch => {
    dispatch({
        type: SET_USER_STARTDATE,
        payload: tripName,
    });
}

export const setStartDate = startDate => dispatch => {
    dispatch({
        type: SET_USER_TRIPNAME,
        payload: startDate,
    });
}

export const setEndDate = endDate => dispatch => {
    dispatch({
        type: SET_USER_ENDDATE,
        payload: endDate,
    });
}

export const setPax = pax => dispatch => {
    dispatch({
        type: SET_USER_PAX,
        payload: pax,
    });
}

export const setBudget = budget => dispatch => {
    dispatch({
        type: SET_USER_BUDGET,
        payload: budget,
    });
}

export const setInterest = interest => dispatch => {
    dispatch({
        type: SET_USER_INTEREST,
        payload: interest,
    });
}

export const setKids = kids => dispatch => {
    dispatch({
        type: SET_USER_KIDS,
        payload: kids,
    });
}

export const setRentCar = rentCar => dispatch => {
    dispatch({
        type: SET_USER_RENTCAR,
        payload: rentCar,
    });
}

export const setRentHomeStay = rentHomeStay => dispatch => {
    dispatch({
        type: SET_USER_RENTHOMESTAY,
        payload: rentHomeStay,
    });
}

export const setLongitude = longitude => dispatch => {
    dispatch({
        type: SET_USER_LONGITUDE,
        payload: longitude,
    });
}

export const setLatitude = latitude => dispatch => {
    dispatch({
        type: SET_USER_LATITUDE,
        payload: latitude,
    });
}