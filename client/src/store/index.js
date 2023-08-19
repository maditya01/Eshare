import {createStore, applyMiddleware, compose} from 'redux'
import reducers from '../reducers/index.js'
import thunk from 'redux-thunk'


//Second argument in this compose
const store = createStore(reducers, compose(applyMiddleware(thunk)))
export default store
