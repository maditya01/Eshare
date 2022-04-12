//This is where we all the Posts that we are going to show in to the frontend.
import React from 'react'
import Post from './Post/Post'
import useStyles from './styles.js'
import {Grid, CircularProgress} from '@material-ui/core'
import {useSelector} from 'react-redux'
//In this Page Total Post ayenge All the posts Are Present here
// console.log('component->posts->posts.js File')
const Posts = ({setCurrentId}) => {
 const classes = useStyles()

 //Jo reducer ne data return kiya hai wo state me store hoga
 //Now ab tum Usko apne Component me acces karo.REDUCER->(GLOBALSTATE)->COMPONENT

 //Component is updated using useSelector.

 //Here in posts we are getting all the posts present in website
 const {posts, isLoading} = useSelector((state) => state.getReducerPosts)

 if (!posts?.length && !isLoading) {
  return 'No posts'
 }
 return (
  <>
   {isLoading ? (
    <CircularProgress />
   ) : (
    <Grid className={classes.container} container alignItem="stretch" spacing={3}>
     {posts.map((post) => (
      <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
       <Post post={post} setCurrentId={setCurrentId} />
      </Grid>
     ))}
    </Grid>
   )}
  </>
 )
}

export default Posts
