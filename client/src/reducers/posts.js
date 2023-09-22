/*What are Reducers. 
 Reducers are pure function.
 Function that takes 2 input:  state and actions.
 Action Type ke according Kaam Hoga Switch Statement Use kar LO.
 Returns new state.
*/
import { COMMENT, FETCH_POST, START_LOADING, END_LOADING, FETCH_BY_SEARCH, FETCH_ALL, UPDATE, DELETE, CREATE, LIKE } from '../constants/actionType.js'

//YOU KNOW THE CYCLE after action we comes into reducer here we have previous state and action.

const initialState = { isLoading: true, posts: [] };

const getReducerPosts = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }
    case END_LOADING:
      return { ...state, isLoading: false }
    case FETCH_ALL:
      console.log(action.payload)
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
      return { ...state, posts: action.payload } //payload ke  under jo data tha wo return hoga
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) }
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) }
    case COMMENT:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) }
    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) }
    case CREATE:
      //yha par mistake ho rha tha ki add karne ke baad add nhi ho rha tha ak aur cheez new post end 
      //me add ho rha tha uske liye unshift use kiya hun
      const tpost = state.posts
      tpost.unshift(action.payload)
      return { ...state, posts: tpost }
    default:
      return state
  }
}

export default getReducerPosts
