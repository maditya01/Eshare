import React,{useEffect} from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import {Container} from '@material-ui/core'
import Home from './components/Home/Home.js'
import Auth from './components/Auth/Auth.js'
import Memories from './components/MemoriesHomePage/Memories.js'
import Article from './components/ArticlesHomePage/Article.js'
import News from './components/NewsHomePage/News'
import MemoryDetails from './components/MemoryDetails/MemoryDetails'
import TinyEditor from './components/Editor/TinyEditor'
import ArticleDetails from './components/ArticleDetails/ArticleDetails.js'

//This is our Top most App(root) Component.
const App = () => {
 const  user = JSON.parse(localStorage.getItem('profile'));
//  useEffect(()=>{
//     user = JSON.parse(localStorage.getItem('profile'))
//  },[user])
//  console.log('in app.js')
 console.log(user)
 return (
  <BrowserRouter>
   <Container maxWidth="lg">
    <Routes>
     {/* Authentication Related Path */}
     <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/memories" />} />
     {/* Memories Related Path  */}
     <Route path="/" element={<Home />} />
     <Route path="/memories" element={<Memories />} />
     <Route path="/memories/search" element={<Memories />} />
     <Route path="/memories/:id" element={<MemoryDetails />} />
     {/* Articles Related Path */}
     <Route path="/articles" element={<Article />} />
     <Route path="/articles/:id" element={<ArticleDetails />} />
     <Route path="/articles/create-article" element={<TinyEditor />} />
     {/* News Related Path */}
     <Route path="/news" element={<News />} />
    </Routes>
   </Container>
  </BrowserRouter>
 )
}

export default App
