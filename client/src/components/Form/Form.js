import React, {useState} from 'react'
import useStyles from './styles.js'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import getReducerPosts from '../../reducers/posts'
//We have to import inside {} why.?
import {creationPost, updatePost} from '../../actions/posts'
// export const updatePost = (id, post) => async (dispatch) => {
//  try {
//   const {data} = await api.updatePost(id, post)
//   dispatch({type: UPDATE, payload: data})
//  } catch (error) {
//   console.log(error.message)
//  }
// }
import {useEffect} from 'react'
import {TextField, Button, Typography, Paper, Box} from '@material-ui/core'
//
import FileBase from 'react-file-base64'

const Form = ({currentId, setCurrentId}) => {
 const navigate = useNavigate()
 //  console.log(tpost)
 const [postData, setPostData] = useState({
  title: '',
  message: '',
  tags: '',
  selectedFile: '', //we Converted our Image in to base 64 String .
 })

 const post = useSelector((state) => (currentId ? state.getReducerPosts.posts.find((p) => p._id === currentId) : null))

 const classes = useStyles()

 const dispatch = useDispatch()

 const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

 //When post value changes.
 useEffect(() => {
  if (post) setPostData(post)
 }, [post, user])

 const clear = () => {
  setCurrentId(null)
  setPostData({
   title: '',
   message: '',
   tags: '',
   selectedFile: '',
  })
 }

 //some problem in handling
 // before reload when we submit post will be seen
 const submitHandler = (e) => {
  e.preventDefault()
  //   console.log(postData)
  if (currentId === null) {
   dispatch(creationPost({...postData, name: user?.result?.name}))
   navigate('/memories')
  } else {
   const res = updatePost(currentId, {...postData, name: user?.result?.name})
   //    console.log(res)
   dispatch(res)
  }
  clear()
  //dispatch ke under kya pass hoga

  //When action is dispatch we go to reducer.
 }
 //user Logged in Nhi hai To Ye return Kar Do
 if (!user?.result?.name) {
  return (
   <Box pt={3}>
    <Paper elevation={6}>
     <Typography varient="h6" align="center">
      Please signin to create your memory and likes other memory
     </Typography>
    </Paper>
   </Box>
  )
 }

 return (
  <>
   <Paper className={classes.paper}>
    <form autoComplete="off" noValidate className={` ${classes.root} ${classes.form}`} onSubmit={submitHandler}>
     <Typography variant="h6">{currentId ? `${'Editing'}` : `${'Creating'}`} a Memory</Typography>
     <TextField required name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} />
     <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} />
     <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} />
     <div className={classes.fileInput}>
      <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})} />
     </div>
     <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
      Submit
     </Button>
    </form>
    <Button variant="contained" color="secondary" type="click" size="small" onClick={clear} fullWidth>
     Clear
    </Button>
   </Paper>
  </>
 )
}
export default Form
