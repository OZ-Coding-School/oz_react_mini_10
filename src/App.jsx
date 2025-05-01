
import './App.css'
import MovieCard from './components/MovieCard.jsx'
import NavBar from './components/NavBar.jsx'
import { Routes, Route } from 'react-router-dom';
import MovieDetail from './components/MovieDetail.jsx'
import Home from './components/Home.jsx'
import Layout from './components/Layout.jsx';
import Join from './components/Join.jsx';
import Login from './components/Login.jsx';



function App() {
  

  return (
    
      <>
     
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="details/:id" element={<MovieDetail />} />
              <Route path="join" element={<Join/>}/>
              <Route path="login" element={<Login/>}/>

            </Route>
          </Routes>
       
      </>
);

      
  
}

export default App
