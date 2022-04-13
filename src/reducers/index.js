import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../config/router.config';
import { videoReducer } from './video';


const appReducer = combineReducers({
    router: connectRouter(history),
    video: videoReducer,
});

export default appReducer;
