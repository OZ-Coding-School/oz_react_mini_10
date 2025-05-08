import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DetailPage from "./pages/Detail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="detail/:id" element={<DetailPage />} />
      </Route>
    </Routes>
  );
};

export default App;


