import {AUTH, LOGOUT} from '../constants/actionType'

const initialState = {authData: JSON.parse(localStorage.getItem('profile'))}

const Auth = (state = initialState, action) => {
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
