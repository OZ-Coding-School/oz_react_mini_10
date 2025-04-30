import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import MovieSliderPage from "./components/MovieSliderPage.tsx"; // 새로 만들 컴포넌트

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MovieList />} />
                <Route path="/details/:id" element={<MovieDetail />} />
                <Route path="/slider" element={<MovieSliderPage />} />
            </Routes>
        </Router>
    );
}

export default App;