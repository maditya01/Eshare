import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:3001'})
//Sari Request karne se pahle req me header add kar do with some token
API.interceptors.request.use((req) => {
 if (localStorage.getItem('profile')) {
  req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
 }
 //mai req return nhi kar rha that isliye error aa rha tha
 return req
})

//OUR BACKEND WILL GET A SPECIFIC TYPE OF HEADERS.

//Isi page se backend me ja rha hai.
//Fetch all the posts From this url.
//This post where will GO.
//action ke under posts me jayega.
export const fetchPosts = () => API.get('/posts')
//Create kar rhe ho Post to axios.post() hoga

//Yhi par Error aa rha tha maine get kiya tha;
export const createPost = (newPost) => API.post('/posts', newPost) //After return i will go to action.

//url/id
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)

export const deletePost = (id) => API.delete(`/posts/${id}`)

//Given Url  par backend me request karega server se
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)
