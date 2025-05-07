import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import SearchPreview from './components/SearchPreview';
import {Layout} from "./components/Layout.tsx"; // new layout with NavBar

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => setIsDarkMode(prev => !prev);
    return (
            <Router>
                <Routes>
                    <Route path="/" element={<Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}>
                        <Route index element={<MovieList isDarkMode={isDarkMode} />} />
                        <Route path="/details/:movieId" element={<MovieDetail isDarkMode={isDarkMode} />} />
                        <Route path="/search" element={<SearchPreview isDarkMode={isDarkMode} />} />
                    </Route>
                </Routes>
            </Router>
    );
}

export default App;