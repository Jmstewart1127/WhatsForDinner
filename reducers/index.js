import { combineReducers } from 'redux';
import PlacesReducer from './reducer_get_places';

const rootReducer = combineReducers({
  places: PlacesReducer,
});

export default rootReducer;