import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import Layout from './components/Layout.jsx'
import MovieDetail from './components/MovieDetail.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route path='/' element={<App />}/> 
        <Route path='/details' element={<MovieDetail />}/>
      </Route>
    </Routes>
    
  </BrowserRouter>
)
