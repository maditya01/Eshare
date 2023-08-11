import React, {useState, useRef} from 'react'
import {Typography, TextField, Button} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import useStyles from './styles'
import DeleteIcon from '@material-ui/icons/Delete'
import {commentPosts} from '../../actions/posts'
const CommentSection = ({post}) => {
 const classes = useStyles()
 const user = JSON.parse(localStorage.getItem('profile'))
 //  console.log('inside CommentSection')
 //  console.log(post?.comments)
 const [comments, setComments] = useState(post?.comments)
 const commentsRef = useRef()
 const [comment, setComment] = useState('')
 const dispatch = useDispatch()
 function onTextChange(e) {
  //   console.log(e.target.value)
  setComment(e.target.value)
 }


 const handleComments = async () => {
  if (comment.length < 1) {
   alert('Enter Comment')
   return
  }
  console.log(user?.result.googleId)
  const newComments = await dispatch(commentPosts(`${user?.result?.name}: ${comment}`, post._id))
  setComments(newComments)
  setComment('') // Problem is here.
  //   commentsRef?.current.scrollIntoView({behavior: 'smooth'})

  //   console.log(comment)
  //   setComments({...comments, comment})
  //   console.log(comments);
  //   //i have to dispatch Comments
  //   const finalComment = `${user.result.name}: ${comment}`
  //   //   console.log(finalComment)
  //   dispatch(commentPosts(finalComment, post._id))
  //   setComment('')
 }
 return (
  <div className={classes.commentsOuterContainer}>
   <div className={classes.commentsInnerContainer}>
    <Typography gutterBottom variant="h6">
     Comments
    </Typography>
    {comments.map((c, i) => (
     <Typography style={{background: 'pink',display:'flex' , justifyContent: 'space-between',}} key={i} gutterBottom variant="subtitle1">
      {c}
      {/* Trying to add delete button in comment you have done
       <Button
      size="small"
      color="primary"
      onClick={() => {
    //    dispatch(deleteComment(post._id))
      }}
     >
      <DeleteIcon fontSize="small" />
      Delete
     </Button> */}
     </Typography>
    ))}
   </div>
   {user?.result.name && (
    <div style={{width: '50%'}}>
     <Typography style={{background: 'red'}} gutterBottom variant="h6">
      Write a Comment
     </Typography>
     <TextField fullWidth maxRows="5" required value={comment} onChange={onTextChange} variant="outlined" label="Comment" multiline />
     <Button variant="contained" color="primary" style={{marginTop: '15px'}} disabled={!comments} onClick={handleComments}>
      Comment
     </Button>
    </div>
   )}
  </div>
 )
}

export default CommentSection
