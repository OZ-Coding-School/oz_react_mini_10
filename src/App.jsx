import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import MovieCard from './components/MovieCard';
import MovieCards from './pages/MovieCards';
import MovieDetail from './pages/MovieDetail';

function App() {
  return(
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element = {<MovieCards />}></Route>
      <Route path="/details/:id" element={<MovieDetail />}/>
      </Route>
    </Routes>
    </>
  )
}
export default App