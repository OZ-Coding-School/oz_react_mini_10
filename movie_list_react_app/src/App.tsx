import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import MovieSliderPage from "./components/MovieSliderPage.tsx";

import {Layout} from "./components/Layout.tsx"; // new layout with NavBar

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MovieList />} />
          <Route path="details/:id" element={<MovieDetail />} />
          <Route path="slider" element={<MovieSliderPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;