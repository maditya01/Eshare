import {AUTH, LOGOUT} from '../constants/actionType'

const Auth = (state = {authData: null}, action) => {
 //  console.log('auth.js reducers')
 //  console.log(state)
 //  console.log(action)
 switch (action.type) {
  case AUTH:
   localStorage.setItem('profile', JSON.stringify({...action?.data}))
   return {...state, authData: action?.data}
  case LOGOUT:
   localStorage.clear()
   return {...state, authData: null}
  default:
   return state
 }
}

export default Auth
