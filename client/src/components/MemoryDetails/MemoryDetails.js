import React, {useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Typography, CircularProgress, Paper, Divider} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import {getPost, getPostsBySearch} from '../../actions/posts'
import useStyles from './styles'
import moment from 'moment'
const MemoryDetails = () => {
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
 const recommendedPosts = posts.filter(({_id}) => _id !== post._id)
 return (
  <Paper style={{padding: '20px', borderRadius: '15px'}} elevation={6}>
   <div className={classes.card}>
    <div className={classes.section}>
     <Typography variant="h3" component="h2">
      {post.title}
     </Typography>
     <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
      {post.tags.map((tag) => `#${tag} `)}
     </Typography>
     <Typography gutterBottom variant="body1" component="p">
      {post.message}
     </Typography>
     <Typography variant="h6">Created by: {post.name}</Typography>
     <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
     <Divider style={{margin: '20px 0'}} />
     <Typography variant="body1">
      <strong>Realtime Chat - coming soon!</strong>
     </Typography>
     <Divider style={{margin: '20px 0'}} />
     <Typography variant="body1">
      <strong>Comments - coming soon!</strong>
     </Typography>
     <Divider style={{margin: '20px 0'}} />
    </div>
    <div className={classes.imageSection}>
     <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
    </div>
   </div>
   {recommendedPosts.length && (
    <div className={classes.section}>
     <Typography guterBottom variant="h5">
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
