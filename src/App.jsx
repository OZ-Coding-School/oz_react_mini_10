import { useEffect } from "react"; // useEffect 임포트
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DetailPage from "./pages/Detail";
import Signup from "./pages/signup";
import Login from "./pages/login";
import { useSupabaseAuth } from "./hook/useSupabaseAuth";
import './App.scss';

const App = () => {
  const { getUserInfo } = useSupabaseAuth(); 

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]); 

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="detail/:id" element={<DetailPage />} />
        <Route path="signup" element={<Signup />} /> 
        <Route path="login" element={<Login />} /> 
      </Route>
    </Routes>
  );
};

export default App;




