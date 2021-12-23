import React from 'react'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import {Container} from '@material-ui/core'

import NavBar from './components/NavBar/NavBar.js'
import Home from './components/Home/Home.js'
import Auth from './components/Auth/Auth.js'
import Memories from './components/memories/Memories.js'
import Article from './components/article/Article.js'
import News from './components/news/News'
import MemoryDetails from './components/MemoryDetails/MemoryDetails'
const memPath = '/memories'
//This is our Top most App(root) Component.
const App = () => {
 const user = JSON.parse(localStorage.getItem('profile'))
 return (
  <BrowserRouter>
   <Container maxWidth="lg">
    
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/memories" element={<Memories />} />
     <Route path="/memories/search" element={<Memories />} />
     <Route path="/memories/:id" element={<MemoryDetails />} />
     <Route path="/articles" element={<Article />} />
     <Route path="/news" element={<News />} />
     <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/memories" />} />
    </Routes>
   </Container>
  </BrowserRouter>
 )
}

export default App
