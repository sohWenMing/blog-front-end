import { Routes, Route } from 'react-router-dom'
import Landing from './components/landing'
import LoginForm from './components/loginForm'
import Home from './components/home'
import NotFound from './components/notFound'
import BlogPosts from './components/blogPosts'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Landing />}/>
        <Route path='/loginForm' element={<LoginForm />} />
        <Route path='/home' element={<Home />} />
        <Route path='/blog_posts' element={<BlogPosts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
