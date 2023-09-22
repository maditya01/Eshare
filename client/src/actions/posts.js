//We are importing everything from api folder as api.
import * as api from '../api/index.js'
import { FETCH_POST, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_ALL, UPDATE, DELETE, CREATE, LIKE } from '../constants/actionType.js'


//Action creators that returns actions.
export const getPosts = (page) => async (dispatch) => {
   
    try {
        dispatch({ type: START_LOADING })
        const apiData = await api.fetchPosts(page);
        // console.log(apiData)
        const { data } = apiData
        // console.log(data);
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        //Getting data  from our backend
        const { data } = await api.fetchPost(id)
        //we pass that data in to dispatch and also we tell type.
        dispatch({ type: FETCH_POST, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const {
            data: { data },
        } = await api.fetchPostsBySearch(searchQuery)
        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const creationPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

//After Doing This you have to go to Reducer.
//There We have to implement the [switch] case of this task.
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        //No need to return some response i want to delete.
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const commentPosts = (finalComment, id) => async (dispatch) => {
    try {
        const { data } = await api.commentPosts(finalComment, id)
        dispatch({ type: 'COMMENT', payload: data })
        //Here  I have written return statement that's why in CommentSection page i am storing in newComments variable
        return data.comments
    } catch (error) {
        console.log(error)
    }
}
export const commentOnPost = (newComment, id) => async (dispatch) => {
    try {
        const { data } = await api.commentOnPost(newComment, id)
    } catch (error) {
        console.log(error);
    }
}
