import { GET_PLACES } from './types';

export default function getPlaces() {
  return dispatch => {
    fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    + 'location=' + this.state.latitude + ',' + this.state.longitude + '&radius=9656'
    + '&type=restaurant&key=AIzaSyAqLTCsOOZ8JB_pjTjeadnRieYpZ9LSc4w')
      .then((response) => response.json())
      .then((responseJson) => {
        const placeNames = [];
        for (let i=0; i<responseJson.results.length; i++) {
          placeNames.push(responseJson.results[i].name);
          console.log(responseJson.results[i].name);
        }
        dispatch(getPlacesAsync(placeNames));
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function getPlacesAsync(places){
  return {
    type: GET_PLACES,
    payload: places
  };
}