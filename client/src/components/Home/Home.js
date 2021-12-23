import React from 'react'
import Index from './index'
import memories from '../../images/memories.png'
import article from '../../images/article.jpg'
import useStyles from './styles'
import {Grid} from '@material-ui/core'
const Home = () => {
 const classes = useStyles()
 return (
  <>
   <Grid container spacing={3} className={classes.grid}>
    <Grid item>
     <Index img={memories} text={'Share your best memories with us'} btnText={'Post Your Memories'} path="/memories" />
    </Grid>
    <Grid item>
     <Index img={article} text={'Write Your Articles  share some Knowledge with Community'} btnText={'Write Your Article'} path="/articles" />
    </Grid>
    <Grid item>
     <Index img={article} text={'Update With Latest News'} btnText={'See Different News'} path="/news" />
    </Grid>
   </Grid>
  </>
 )
}
export default Home
