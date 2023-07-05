import React, {useState} from 'react'
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
//Singula Post is Comming.
const Post = ({post, setCurrentId}) => {
 const classes = useStyles()
 const dispatch = useDispatch()
 const [likes, setLikes] = useState(post?.likes)
 //After clicking this Form me jo value thee wo update hona chahiye.

 //Getting User From Local Storage.
 const user = JSON.parse(localStorage.getItem('profile'))

 const navigate = useNavigate()

 const userId = user?.result?.googleId || user?.result?._id
 //After Clicking on 3 dots.i have set the current Post ID.
 const moreHoriz = () => {
  setCurrentId(post._id)
  //This value passed above to the parent component.Lifting state up wala concept lag rha hai.
  // Post->Posts->Home
  //Home->Form(Form Ko Update Karega usme previous Value Fill kar dega)
 }

 //After clicking on a single Post
 const openPage = () => {
  navigate(`/memories/${post._id}`)
 }
 const handleLike = async () => {
  dispatch(likePost(post._id))
  if (post.likes.find((like_id) => like_id === userId)) {
   setLikes(post.likes.filter((id) => id !== userId))
  } else {
   setLikes([...post.likes, userId])
  }
 }
 //After Clicking on Like Button,Logic Behind Like Button
 const Likes = () => {
  if (likes.length > 0) {
   //Means you have Like
   return likes.find((like_id) => like_id === userId) ? (
    <>
     <ThumbUpAltIcon fontSize="small" /> &nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
    </>
   ) : (
    <>
     <ThumbUpAltOutlinedIcon fontSize="small" />
     &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
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
    {(userId === post?.creator || userId === post?.creator) && (
     <div className={classes.overlay2}>
      <Button style={{color: 'white'}} size="small" onClick={moreHoriz}>
       <MoreHorizIcon fontSize="small" />
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
    <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
     <Likes />
    </Button>

    {/* For Deleting a Post you should the creator of that post otherwise you will not see delete button*/}
    {(userId === post?.creator || userId === post?.creator) && (
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
