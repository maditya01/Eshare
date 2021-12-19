//What are Reducers.
//Reducers are Function.
//Function that accepts state and actions.
//Action Type ke according Kaam Hoga Switch Statement Use kar LO.
//In Reducers You have always State you can not return empty State.
//set The initial Value.
import {FETCH_ALL, UPDATE, DELETE, CREATE, LIKE} from '../constants/actionType.js'

//YOU KNOW THE CYCLE after action we comes into reducer here we have previous state and action.
// eslint-disable-next-line import/no-anonymous-default-export

const getReducerPosts = (posts = [], action) => {
 //Dispatch hone ke baad Yhi par Ayega
 //usme Data hoga and action hoga
 //In sare action ko Dispatch karne ke baad corresponding Component me jao.
 switch (action.type) {
  case FETCH_ALL:
   return action.payload //payload ke  under jo data tha wo return hoga
  case DELETE:
   return posts.filter((post) => post._id !== action.payload)
  case UPDATE:
   return posts.map((post) => (post._id === action.payload._id ? action.payload : post))
  case LIKE:
   return posts.map((post) => (post._id === action.payload._id ? action.payload : post))
  case CREATE:
   return [...posts, action.payload]
  default:
   return posts
 }
}

export default getReducerPosts
