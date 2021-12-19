import React from 'react'
import {Container, Grow, Grid} from '@material-ui/core'
//importing all the posts avialable  into the project
import Posts from '../Posts/Posts.js'
// importing form details
import Form from '../Form/Form.js'
import {useEffect, useState} from 'react'
//Due to React Hooks Much Simpler to use Redux.
import {useDispatch} from 'react-redux'
//
import {getPosts} from '../../actions/posts.js'

const Home = () => {
 const [currentId, setCurrentId] = useState(null)
 console.log('we are try to find currentId in Home directory')
 console.log(currentId)
 // What does useDispatch
 const dispatch = useDispatch()

 //Why useEffect
 useEffect(() => {
  dispatch(getPosts())
 }, [currentId, dispatch])

 return (
  <Grow in>
   <Container>
    {/* xtra small device ke full width 12 small keliey 7 */}
    <Grid container justify="space-between" alignItems="stretch">
     <Grid item xs={12} sm={7}>
      <Posts setCurrentId={setCurrentId} />
     </Grid>
     <Grid item xs={12} sm={4}>
      <Form currentId={currentId} setCurrentId={setCurrentId} />
     </Grid>
    </Grid>
   </Container>
  </Grow>
 )
}

export default Home
