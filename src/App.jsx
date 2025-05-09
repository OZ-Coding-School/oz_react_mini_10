import Card from './component/MovieCard';
import Detail from './component/MovieDetail';
import NavBar from './component/NavBar';
import AuthUI from './component/Auth';
import Dashboard from './component/Dashboard';
import Footer from './component/Footer';
import { ThemeProvider } from './component/ThemeContext';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { supabase } from './supabase';

function Main() {
  const location = useLocation();
  const hideNavBar = location.pathname === '/auth'|| location.pathname === '/dashboard';
  const hideFooter = location.pathname === '/auth';

  return (
    <>
    <div className="flex flex-col min-h-screen">
    <main className="flex-grow">
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Card />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="/auth" element={<AuthUI />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Main />
      </Router>
    </ThemeProvider>
  );
}

export default App;