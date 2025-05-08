import React from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MovieList />} />
        <Route path="/videos/:keyword" element={<MovieList />} />
        <Route path="/details/:id" element={<MovieDetail />} />
        <Route
          path="/favorites"
          element={<div className="container mx-auto p-4">즐겨찾기 페이지</div>}
        />
        <Route
          path="/about"
          element={
            <div className="container mx-auto p-4">영화 앱 소개 페이지</div>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
