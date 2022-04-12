import {createStore, applyMiddleware, compose} from 'redux'

//We are importing reducer from reducer index.js folder.
import reducers from '../reducers/index.js'
// import {combineReducers} from 'redux'

// import getReducerPosts from './posts'
// import Auth from './auth'
// //Where we are importing This Thing ya in store Folder GLOBAL STORE.
// const reducers = combineReducers({getReducerPosts, Auth})
// //reducerPosts is a state that is stored in GLOBAL STORE OF REDUX
// //we are getting from reducerPosts.
// export default reducers


import thunk from 'redux-thunk'
//Second argument in this compose
const store = createStore(reducers, compose(applyMiddleware(thunk)))
export default store
