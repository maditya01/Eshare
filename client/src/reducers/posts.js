//What are Reducers.
//Reducers are Function.
//Function that accepts state and actions.
//Action Type ke according Kaam Hoga Switch Statement Use kar LO.
//In Reducers You have always State you can not return empty State.
//set The initial Value.
import {COMMENT, FETCH_POST, START_LOADING, END_LOADING, FETCH_BY_SEARCH, FETCH_ALL, UPDATE, DELETE, CREATE, LIKE} from '../constants/actionType.js'

//YOU KNOW THE CYCLE after action we comes into reducer here we have previous state and action.
// eslint-disable-next-line import/no-anonymous-default-export

const getReducerPosts = (state = {isLoading: true, posts: []}, action) => {
 //YHI PAR ANE KE BAAD STATE UPDATE HOGI
 //Dispatch hone ke baad Yhi par Ayega
 //usme Data hoga and action hoga
 //In sare action ko Dispatch karne ke baad corresponding Component me jao.
 switch (action.type) {
  case START_LOADING:
   return {...state, isLoading: true}
  case END_LOADING:
   return {...state, isLoading: false}
  case FETCH_ALL:
   return {
    ...state,
    posts: action.payload.data,
    currentPage: action.payload.currentPage,
    totalNumberofPages: action.payload.totalNumberofPages,
   }
  case FETCH_POST:
   return {
    ...state,
    post: action.payload,
    currentPage: action.payload.currentPage,
    totalNumberofPages: action.payload.totalNumberofPages,
   }
  case FETCH_BY_SEARCH:
   return {...state, posts: action.payload} //payload ke  under jo data tha wo return hoga
  case DELETE:
   return {...state, posts: state.posts.filter((post) => post._id !== action.payload)}
  case UPDATE:
   return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))}
  case COMMENT:
   return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))}
  case LIKE:
   return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))}
  case CREATE:
   return {...state, posts: [...state, action.payload]}
  default:
   return state
 }
}

export default getReducerPosts
