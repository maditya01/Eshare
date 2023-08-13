import React from 'react'
import Post from './Post/Post'
import useStyles from './styles.js'
import { Grid, CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'

/*In this component we will iterate through all the posts using map concept.
for a unique post we are creating a child component and we are passing unique post and some more props.
It takes a props setCurrentId which is used to set the id of a unique post
Its parent component which is Memories send this props and this component will do nothing and it justs send to its child.
*/

const Posts = ({ setCurrentId }) => {
  const classes = useStyles()

  /*
  The useSelector hook is used to extract the state of a component from the 
  redux store using the selector function.
  Jo reducer ne data return kiya hai wo state me store hoga
  Now ab tum Usko apne Component me acces karo.REDUCER------>(GLOBALSTATE)------>COMPONENT
  Component is updated using useSelector.
  Here in posts we are getting all the posts present in website
  */
  const { posts, isLoading } = useSelector((state) => state.getReducerPosts)


  /*If there is no post present in app then return */
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
