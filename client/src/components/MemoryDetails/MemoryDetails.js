import React, {useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Typography, CircularProgress, Paper, Divider} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import {getPost, getPostsBySearch} from '../../actions/posts'
import useStyles from './styles'
import CommentSection from './CommentSection'
import moment from 'moment'

// After Clicking on a particular Memory

const MemoryDetails = () => {
 //we are getting single post which we have Click
 const {post, posts, isLoading} = useSelector((state) => state.getReducerPosts)
 const classes = useStyles()
 const navigate = useNavigate()
 const dispatch = useDispatch()
 const {id} = useParams()

 useEffect(() => {
  dispatch(getPost(id))
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [id])

 useEffect(() => {
  if (post) {
   dispatch(getPostsBySearch({search: 'none', tags: post?.tags.join(',')}))
  }
 }, [post])

 if (!post) return null
 if (isLoading) {
  return (
   <Paper>
    <CircularProgress />
   </Paper>
  )
 }

 const openPost = (_id) => {
  navigate(`/memories/${_id}`)
 }

 //Recommended Post bhee Clickable honge unko Click karne par jo bhee post
 //ke id hogi us URL par jayega

 const recommendedPosts = posts.filter(({_id}) => _id !== post._id)
 return (
  <Paper style={{width: '100%', height: '100%', padding: '15px', borderRadius: '10px'}} elevation={3}>
   <div className={classes.card}>
    <div className={classes.section}>
     <Typography style={{background: 'salmon', textAlign: 'center', padding: '5px'}} variant="h3" component="h2">
      {post.title}
     </Typography>
     <Typography style={{background: 'grey'}} gutterBottom variant="h5" component="h2">
      {post.tags.map((tag) => `#${tag} `)}
     </Typography>
     <Typography style={{background: 'yellow', padding: '20px'}} gutterBottom variant="body1" component="p">
      {post.message}
     </Typography>
     <Typography style={{background: 'red', marginTop: '20px'}} variant="h6">
      Created by: {post.name}
     </Typography>
     <Typography style={{background: 'green'}} variant="body1">
      {moment(post.createdAt).fromNow()}
     </Typography>
     {/* <Divider style={{margin: '20px 0'}} />
     <Typography variant="body1">
      <strong>Realtime Chat - coming soon!</strong>
     </Typography>
     <Divider style={{margin: '20px 0'}} /> */}
     <Typography style={{margin: '20px', padding: '10px', background: 'green'}} variant="body1">
      {/* COMMENT SECTION IS HERE WE ARE WORKING HERE */}
      <CommentSection post={post} />
     </Typography>
     <Divider style={{margin: '20px 0'}} />
    </div>
    {/* IMAGE SECTION OF PARTICULAR POST */}
    <div className={classes.imageSection}>
     <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
    </div>
   </div>
   {recommendedPosts.length && (
    <div className={classes.section}>
     <Typography gutterBottom variant="h5">
      You might also Like
     </Typography>
     <Divider />
     <div className={classes.recommendedPosts}>
      {recommendedPosts.map(({title, message, name, likes, selectedFile, _id}) => (
       <div style={{margin: '4px', cursor: 'pointer'}} onClick={() => openPost(_id)}>
        <Typography gutterBottom variant="h6">
         {title}
        </Typography>
        <Typography gutterBottom variant="subtitle2">
         {name}
        </Typography>
        <Typography gutterBottom variant="subtitle1">
         {message}
        </Typography>
        <Typography gutterBottom variant="subtitle1">
         Likes: {likes.length}
        </Typography>
        <img style={{width: '193px', height: '210px'}} src={selectedFile} alt={name} />
       </div>
      ))}
     </div>
    </div>
   )}
  </Paper>
 )
}

export default MemoryDetails
