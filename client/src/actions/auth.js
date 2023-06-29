import * as api from '../api/index.js' //We are importing everything from api folder as api.
import {AUTH} from '../constants/actionType.js'

//if actions are asynchrounous then we have to use
//redux thunk  function that return async function which has dispatch.
export const signup = (formData, navigate, pathname) => async (dispatch) => {
 try {
  //Signup the user
  const {data} = await api.signUp(formData)
  dispatch({type: AUTH, data})
  navigate('/memories')
 } catch (error) {
  console.log('Sign-up Error')
  console.log(error.message)
 }
}
export const signin = (formData, navigate) => async (dispatch) => {
 try {
  //login the user
  const {data} = await api.signIn(formData)
//   var action = {type: 'AUTH', data}
//   console.log(action)
  dispatch({type: 'AUTH', data})
  navigate('/memories')
 } catch (error) {
  console.log("Sign-in Error")
  console.log(error)
 }
}

