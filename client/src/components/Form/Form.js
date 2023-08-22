import React, {useState} from 'react'
import useStyles from './styles.js'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import getReducerPosts from '../../reducers/posts'
import {creationPost, updatePost} from '../../actions/posts'
import {useEffect} from 'react'
import {TextField, Button, Typography, Paper, Box} from '@material-ui/core'
import FileBase from 'react-file-base64'

const Form = ({currentId, setCurrentId}) => {
 const navigate = useNavigate()
 const [postData, setPostData] = useState({
  title: '',
  message: '',
  tags: '',
  selectedFile: '', //We have to  convert our image in to base 64 String.
 })

 const post = useSelector((state) => (currentId ? state.getReducerPosts.posts.find((p) => p._id === currentId) : null))

 /*We are getting auth data direct from reducer
 Here we will not use localstorage because that thing is done in reducer here just we have to fetch from 
 global state
 */
 const myuser = useSelector((state)=>state.Auth.authData)

 const classes = useStyles()

 const dispatch = useDispatch()
 //When post value changes.
 useEffect(() => {
  if (post) setPostData(post)
 }, [post,myuser])

 const clear = () => {
  setCurrentId(null)
  setPostData({
   title: '',
   message: '',
   tags: '',
   selectedFile: '',
  })
 }
 const submitHandler = (e) => {
  e.preventDefault()
  if (currentId === null) {
   dispatch(creationPost({...postData, name: myuser?.result?.name}))
   navigate('/memories')
  } else {
   const res = updatePost(currentId, {...postData, name: myuser?.result?.name})
   dispatch(res)
  }
  clear()
 }
 /*If user is not logged in then we will show this thing */
 if (!myuser?.result?.name) {
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
