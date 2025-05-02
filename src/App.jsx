// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListPage from './component/ListPage';
import MovieDetail from './component/MovieDetail';
import NavBar from './component/NavBar';
import './App.css';

function App() {
  return (
    <>   
    <NavBar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/movie/1" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
