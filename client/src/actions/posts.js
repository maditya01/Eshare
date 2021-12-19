import * as api from '../api/index.js' //We are importing everything from api folder as api.
import {FETCH_ALL, UPDATE, DELETE, CREATE, LIKE} from '../constants/actionType.js'
//Action creators that returns actions.

export const getPosts = () => async (dispatch) => {
 try {
  //Getting data  from our backend
  const {data} = await api.fetchPosts()
  //we pass that data in to dispatch and also we tell type.
  dispatch({type: FETCH_ALL, payload: data})
 } catch (error) {
  console.log(error)
 }
 //   //action is a  object witch has a type and payload which has a data.
 //   const action = {
 //     type: "FETCH_ALL",
 //     payload: [],
 //   };
 //   //Due to redux thunk we are dealing with asynchrous .
 //   dispatch(action);
}

export const creationPost = (post) => async (dispatch) => {
 console.log(post)
 try {
  const {data} = await api.createPost(post)
  console.log('Kya Return Hua')
  dispatch({type: CREATE, payload: data})
 } catch (error) {
  console.log(error)
 }
}

//After Doing This you have to go to Reducer.
//There We have to implement the [switch] case of this task.
export const updatePost = (id, post) => async (dispatch) => {
 try {
  const {data} = await api.updatePost(id, post)
  dispatch({type: UPDATE, payload: data})
 } catch (error) {
  console.log(error.message)
 }
}

export const deletePost = (id) => async (dispatch) => {
 try {
  //No need to return some response i want to delete.
  await api.deletePost(id)
  dispatch({type: DELETE, payload: id})
 } catch (error) {
  console.log(error)
 }
}

export const likePost = (id) => async (dispatch) => {
 try {
  const {data} = await api.likePost(id)
  dispatch({type: LIKE, payload: data})
 } catch (error) {
  console.log(error)
 }
}
