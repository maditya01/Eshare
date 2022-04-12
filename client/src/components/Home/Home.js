// //i have to design this Page like modern Website
//seeing Memories and reading article features is also avialable
//All the Different Feature This Sites is Providing
import React from 'react'
import {Link} from 'react-router-dom'
// import Index from './index'
// import memories from '../../images/memories.png'
// import article from '../../images/article.jpg'
// import useStyles from './styles'

const Home = () => {
 return (
  <>
   <ul style={{display: 'flex', justifyContent: 'center'}}>
    <Link style={{margin: '1em'}} to="/memories">
     Memories
    </Link>
    <Link style={{margin: '1em'}} to="/articles">
     Articles
    </Link>
    <Link style={{margin: '1em'}} to="/news">
     News
    </Link>
   </ul>
  </>
 )
}
export default Home
