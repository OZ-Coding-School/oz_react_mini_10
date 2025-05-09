import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Route,Routes } from 'react-router-dom'
import MovieDetail from './component/MovieDetail.jsx'
import Layout from './component/Layout.jsx'
import MovieSearch from './component/MovieSearch.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route path="/search/" element={<MovieSearch />} />
      </Route> 
    </Routes>
</BrowserRouter>
)
