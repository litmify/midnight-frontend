import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({ auth } as any);

export default rootReducer;
