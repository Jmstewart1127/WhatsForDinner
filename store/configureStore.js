import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const configureStore = (initialState: Object) => {

  return createStore(rootReducer, initialState);
};

export default configureStore;