import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#2d3748] to-[#1e293b] text-white">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MovieList />} />
          <Route path="/details/:id" element={<MovieDetail />} /> {/* 동적 라우팅 */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;