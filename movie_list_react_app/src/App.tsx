import { useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import SearchPreview from './components/SearchPreview';
import {Layout} from "./components/Layout.tsx";
import RegisterPage from "./User/RegisterPage.tsx"; // new layout with NavBar

function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved === "true";
    });
    const toggleDarkMode = () => {
        setIsDarkMode(prev => {
            const newValue = !prev;
            localStorage.setItem("darkMode", String(newValue));
            return newValue;
        });
    };


    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>}>
                        <Route index element={<MovieList isDarkMode={isDarkMode}/>}/>
                        <Route path="/details/:movieId" element={<MovieDetail isDarkMode={isDarkMode}/>}/>
                        <Route path="/search" element={<SearchPreview isDarkMode={isDarkMode}/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;