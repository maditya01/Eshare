import {combineReducers} from 'redux'
/*
What is a Reducer function.
Reducer function is a general function in javascript.  Called by redux library.
Recieves 2 inputs [Old State, Dispatched action]
Returns new State.
*/
import getReducerPosts from './posts'
import Auth from './auth'
//Where we are importing This Thing ya in store Folder GLOBAL STORE.
const reducers = combineReducers({getReducerPosts, Auth})
//reducerPosts is a state that is stored in GLOBAL STORE OF REDUX
//we are getting from reducerPosts.
export default reducers
