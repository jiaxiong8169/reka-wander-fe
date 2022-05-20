import {
  SET_PACKAGES,
  SET_GUIDES_TOTAL,
  SET_GUIDE_LAT,
  SET_GUIDE_LONG,
  SET_GUIDES_DATA,
  SET_GUIDE_LOCATION,
  SET_GUIDE_START_DATE,
  SET_GUIDE_END_DATE,
  RESET_GUIDE,
} from './actions';

const initialState = {
  packages: [],
  guideTotal: 0,
  guidesData: [],
  guidesLocation: '',
  guideStartDate: new Date(),
  guideEndDate: new Date(),
};

function guidesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PACKAGES:
      return {...state, packages: action.payload};
    case SET_GUIDES_TOTAL:
      return {...state, guideTotal: action.payload};
    case SET_GUIDE_LAT:
      return {...state, guideLat: action.payload};
    case SET_GUIDE_LONG:
      return {...state, guideLong: action.payload};
    case SET_GUIDES_DATA:
      return {...state, guidesData: action.payload};
    case SET_GUIDE_LOCATION:
      return {...state, guidesLocation: action.payload};
    case SET_GUIDE_START_DATE:
      return {...state, guideStartDate: action.payload};
    case SET_GUIDE_END_DATE:
      return {...state, guideEndDate: action.payload};
    case RESET_GUIDE:
        return initialState;
      default:
      return state;
  }
}

export default guidesReducer;
