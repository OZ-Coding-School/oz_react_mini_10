import { useEffect } from 'react';
import Card from './component/MovieCard';
import Detail from './component/MovieDetail';
import NavBar from './component/NavBar';
import { ThemeProvider } from './component/ThemeContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  useEffect(() => {
    console.log("TMDB Token:", import.meta.env.VITE_TMDB_READ_TOKEN);
  }, []);


  return (
    <>
    <ThemeProvider>
    <Router>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
    </Router>
    </ThemeProvider>
    </>
  );
}

export default App;