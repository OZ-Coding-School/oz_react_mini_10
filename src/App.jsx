
import './App.css'
import MovieCard from './components/MovieCard.jsx'
import NavBar from './components/NavBar.jsx'
import { Routes, Route } from 'react-router-dom';
import MovieDetail from './components/MovieDetail.jsx'
import Home from './components/Home.jsx'



function App() {
  

  return (
    <>
        <header>
          <NavBar/>
        </header>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/details/:id' element={<MovieDetail /> }></Route>
        </Routes>
      
      
   </>
  )
}

export default App
