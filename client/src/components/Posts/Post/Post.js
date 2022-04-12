import React from 'react'
import useStyles from './styles.js'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
//Here We have Single Post Only One post.
import {Card, ButtonBase, CardActions, CardContent, CardMedia, Button, Typography} from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import {deletePost, likePost} from '../../../actions/posts.js'
const Post = ({post, setCurrentId}) => {
 const classes = useStyles()
 const dispatch = useDispatch()
 //After clicking this Form me jo value thee wo update hona chahiye.
 const user = JSON.parse(localStorage.getItem('profile'))
 const navigate = useNavigate()

 //After Clicking on 3 dots.i have set the current Post ID.
 const moreHoriz = () => {
  setCurrentId(post._id)
  //This value passed above to the parent component.
  // Post->Posts->Home
  //Home->Form(Form Ko Update Karega usme previous Value Fill kar dega)
 }

 //After clicking on a single Post
 const openPage = () => {
  navigate(`/memories/${post._id}`)
 }

 //After Clicking on Like Button,Logic Behind Like Button
 const Likes = () => {
  if (post?.likes?.length > 0) {
   //Means you have Like
   return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
    <>
     <ThumbUpAltIcon fontSize="small" />
     &nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
    </>
   ) : (
    <>
     <ThumbUpAltOutlinedIcon fontSize="small" />
     &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
    </>
   )
  }

  return (
   <>
    <ThumbUpAltOutlinedIcon fontSize="small" />
    &nbsp;Like
   </>
  )
 }

 return (
  <Card raised elevation={6} className={classes.card}>
   <ButtonBase className={classes.cardAction} onClick={openPage}>
    <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
    <div className={classes.overlay}>
     <Typography varient="h6">{post.name}</Typography>
     <Typography varient="body2">{moment(post.createdAt).fromNow()}</Typography>
    </div>
    {/* A 3 vertical dot icon Logic For updating the Post you should have the creator of the post */}
    {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
     <div className={classes.overlay2}>
      <Button style={{color: 'white'}} size="small" onClick={moreHoriz}>
       <MoreHorizIcon fontSize= "small" />
      </Button>
     </div>
    )}
    <div className={classes.details}>
     {/* Tags ak array hai usko output karane ke liye map ka 
          use karo.
        */}
     <Typography variant="body2" color="textSecondary">
      {post.tags.map((tag) => `#${tag}`)}
     </Typography>
    </div>

    <Typography className={classes.title} variant="h5" gutterBottom>
     {post.title}
    </Typography>
    <CardContent>
     <Typography variant="body2" color="textSecendory" component="p">
      {post.message}
     </Typography>
    </CardContent>
   </ButtonBase>
   <CardActions className={classes.cardActions}>
    {/* Like Button  */}
    <Button
     size="small"
     color="primary"
     disabled={!user?.result}
     onClick={() => {
      dispatch(likePost(post._id))
     }}
    >
     <Likes />
    </Button>

    {/* For Deleting a Post you should the creator of that post otherwise you will not see delete button*/}
    {(user?.result?._id === post?.creator || user?.result?.googleId === post?.creator) && (
     <Button
      size="small"
      color="primary"
      onClick={() => {
       dispatch(deletePost(post._id))
      }}
     >
      <DeleteIcon fontSize="small" />
      Delete
     </Button>
    )}
   </CardActions>
  </Card>
 )
}
export default Post
