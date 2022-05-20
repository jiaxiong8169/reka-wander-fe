export const SET_PACKAGES = 'SET_PACKAGES';
export const SET_GUIDES_TOTAL = 'SET_GUIDES_TOTAL';
export const SET_GUIDE_LAT ='SET_GUIDE_LAT';
export const SET_GUIDE_LONG ='SET_GUIDE_LONG';
export const SET_GUIDES_DATA = 'SET_GUIDES_DATA';
export const SET_GUIDE_LOCATION = 'SET_GUIDE_LOCATION';
export const SET_GUIDE_START_DATE = 'SET_GUIDE_START_DATE';
export const SET_GUIDE_END_DATE = 'SET_GUIDE_END_DATE';
export const RESET_GUIDE ='RESET_GUIDE';

export const setPackages = packages => dispatch => {
    dispatch({
        type: SET_PACKAGES,
        payload: packages,
    });
    console.log(packages);
};

export const setGuidesTotal = guideTotal => dispatch => {
    dispatch({
        type: SET_GUIDES_TOTAL,
        payload: guideTotal,
    });
};

export const setGuideLat = guideLat => dispatch => {
    dispatch({
        type: SET_GUIDE_LAT,
        payload: guideLat,
    });
};

export const setGuideLong = guideLong => dispatch => {
    dispatch({
        type: SET_GUIDE_LONG,
        payload: guideLong,
    });
};

export const setGuideData = guidesData => dispatch => {
    dispatch({
        type:SET_GUIDES_DATA,
        payload: guidesData,
    });
    console.log(guidesData);
};

export const setGuideLocation = guidesLocation => dispatch => {
    dispatch({
        type:SET_GUIDE_LOCATION,
        payload: guidesLocation,
    });
    console.log(guidesLocation);
};

export const setGuideStartDate = guideStartDate => dispatch => {
    dispatch({
        type: SET_GUIDE_START_DATE,
        payload: guideStartDate,
    });
};

export const setGuideEndDate = guideEndDate => dispatch => {
    dispatch({
        type: SET_GUIDE_END_DATE,
        payload: guideEndDate,
    });
};

export const resetGuide = () => dispatch => {
    dispatch({
        type: RESET_GUIDE,
        payload: {},
    });
};