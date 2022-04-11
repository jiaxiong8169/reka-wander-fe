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
    console.log("tripName")
    console.log(tripName)
}

export const setStartDate = startDate => dispatch => {
    dispatch({
        type: SET_USER_TRIPNAME,
        payload: startDate,
    });
    console.log("startDate")
    console.log(startDate)
}

export const setEndDate = endDate => dispatch => {
    dispatch({
        type: SET_USER_ENDDATE,
        payload: endDate,
    });
    console.log("endDate")
    console.log(endDate)
}

export const setPax = pax => dispatch => {
    dispatch({
        type: SET_USER_PAX,
        payload: pax,
    });
    console.log("pax")
    console.log(pax)
}

export const setBudget = budget => dispatch => {
    dispatch({
        type: SET_USER_BUDGET,
        payload: budget,
    });
    console.log("budget")
    console.log(budget)
}

export const setInterest = interest => dispatch => {
    dispatch({
        type: SET_USER_INTEREST,
        payload: interest,
    });
    console.log("interest")
    console.log(interest)
}

export const setKids = kids => dispatch => {
    dispatch({
        type: SET_USER_KIDS,
        payload: kids,
    });
    console.log("kids")
    console.log(kids)
}

export const setRentCar = rentCar => dispatch => {
    dispatch({
        type: SET_USER_RENTCAR,
        payload: rentCar,
    });
    console.log("rentCar")
    console.log(rentCar)
}

export const setRentHomeStay = rentHomeStay => dispatch => {
    dispatch({
        type: SET_USER_RENTHOMESTAY,
        payload: rentHomeStay,
    });
    console.log("rentHomeStay")
    console.log(rentHomeStay)
}

export const setLongitude = longitude => dispatch => {
    dispatch({
        type: SET_USER_LONGITUDE,
        payload: longitude,
    });
    console.log("longitude")
    console.log(longitude)
}

export const setLatitude = latitude => dispatch => {
    dispatch({
        type: SET_USER_LATITUDE,
        payload: latitude,
    });
    console.log("latitude")
    console.log(latitude)
}