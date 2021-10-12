import { GOOGLE_PLACES_API, GOOGLE_MAPS_API } from '@env';

const SET_PLACES = 'SET_PLACES';
const CLEAR_PLACES = 'CLEAR_PLACES';

export const setPlaces = (places) => {
  return {
    type: SET_PLACES,
    places,
  };
};

export const clearPlaces = () => {
  return {
    type: CLEAR_PLACES,
    places: [],
  };
};

export const _highPriorityFetchPlaces = () => {
  return async (dispatch, getState) => {
    try {
      // clears the previously set places
      dispatch(clearPlaces());

      const { location, task } = getState();
      const tasks = task.tasks;
      // hardcoded radius, we can dynamically change this based on priority maybe?
      const radius = 500;

      // here we have to know which tasks we previously sent a push notification for, and send a push notification for the next task. Extract the task we want to send a push notification for from the tasks state
      // task.tasks.forEach((task) => {
      //   if (task.priority === 'HIGH') {
      //   }
      // });

      const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
      const locationUrl = `location=${location.coords.latitude},${location.coords.longitude}&radius=${radius}`;
      const typeData = `&types=${type}`;
      const api = `&key=${GOOGLE_PLACES_API}`;

      const url = `${baseUrl}${locationUrl}${typeData}${api}`;

      fetch(url)
        .then((res) => res.json())
        .then(dispatch(setPlaces(res)));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_PLACES:
      return action.places;
    case CLEAR_PLACES:
      return action.places;
    default:
      return state;
  }
};