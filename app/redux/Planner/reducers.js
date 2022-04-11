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
} from './actions';
import moment from 'moment';

const initialState = {
    tripName: '',
    startDate: moment(),
    endDate: moment(),
    pax: 0,
    budget: 100,
    interest: ["Entertaiment", "Leisure"],
    kids: true,
    rentCar: true,
    rentHomeStay: true,
    longitude: '...',
    latitude: '...',
}