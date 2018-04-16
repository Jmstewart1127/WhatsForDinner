import { GET_PLACES } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_PLACES:
      return action.payload;

    default:
      return state;
  }

}

