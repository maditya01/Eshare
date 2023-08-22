import axios from 'axios'

//For Deploying on Heroku.->
//Use the heroku api.
const API = axios.create({baseURL: 'https://memoriesshare-okx6.onrender.com'})

//Sari Request karne se pahle req me header add kar do with some token
API.interceptors.request.use((req) => {
 //  console.log('in interceptors')
 //  console.log(req.headers.Authorization)
 if (localStorage.getItem('profile')) {
  req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
 }
 //mai req return nhi kar rha that isliye error aa rha tha
 return req
})
// console.log("In api/index.js folder")
//OUR BACKEND WILL GET A SPECIFIC TYPE OF HEADERS.

//Isi page se backend me ja rha hai.
//Fetch all the posts From this url.
//This post where will GO.
//action ke under posts me jayega.
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPost = (id) => API.get(`/posts/${id}`)
//Create kar rhe ho Post to axios.post() hoga

//Yhi par Error aa rha tha maine get kiya tha;
export const createPost = (newPost) => API.post('/posts', newPost) //After return i will go to action.

//url/id
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id) => API.delete(`/posts/${id}`)

//Given Url  par backend me request karega server se
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signUp = (formData) => API.post('/user/signup', formData)
export const signIn = (formData) => API.post('/user/signin', formData)

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&searchTags=${searchQuery.tags}`)

export const commentPosts = (finalComment, id) => API.post(`/posts/${id}/commentPost`, {finalComment})

export const commentOnPost = (newComment,id)=> API.post(`/posts/${id}/commentOnPost`,{newComment})