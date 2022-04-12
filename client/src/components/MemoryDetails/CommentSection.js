import React, {useState, useRef} from 'react'
import {Typography, TextField, Button} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import useStyles from './styles'
import {commentPosts} from '../../actions/posts'
const CommentSection = ({post}) => {
 const classes = useStyles()
 const user = JSON.parse(localStorage.getItem('profile'))
 console.log('inside CommentSection')
 console.log(post?.comments)
 const [comments, setComments] = useState(post?.comments)
 const [comment, setComment] = useState('')
 const dispatch = useDispatch()

 const handleComments = () => {
  //i have to dispatch Comments
  const finalComment = `${user.result.name}: ${comment}`
  console.log(finalComment)
  dispatch(commentPosts(finalComment, post._id))
 }
 return (
  <div className={classes.commentsOuterContainer}>
   <div className={classes.commentsInnerContainer}>
    <Typography gutterBottom variant="h6">
     Comments
    </Typography>
    {comments.map((c, i) => (
     <Typography key={i} gutterBottom variant="subtitle1">
      {c}
     </Typography>
    ))}
   </div>
   {user?.result.name && (
    <div style={{width: '50%'}}>
     <Typography gutterBottom variant="h6">
      Write a Comment
     </Typography>
     <TextField value={comment} onChange={(e) => setComment(e.target.value)} fullWidth rows={4} variant="outlined" label="Comment" multiline />
     <Button variant="contained" color="primary" sytle={{marginTop: '15px'}} disabled={!comments} onClick={handleComments}>
      Comment
     </Button>
    </div>
   )}
  </div>
 )
}

export default CommentSection
