import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers ,compose} from 'redux';
import { userReducer,roomReducer,chatReducer} from './reducers/userReducer';

const userDetails = localStorage.getItem('user');
const user = userDetails ? JSON.parse(userDetails) : {};
const roomDetails = localStorage.getItem('room');
const room = roomDetails ? JSON.parse(roomDetails) : {};
const isAuthenticated=localStorage.getItem('isAuthenticated');
const isRoom=localStorage.getItem('isRoom');

const initialState = {
  user:{isAuthenticated,user},
  room:{isRoom,room},
  chat: [], 
};
const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
  chat: chatReducer,
});
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(rootReducer,initialState,composeEnhancers(applyMiddleware(thunk)));

export default store;