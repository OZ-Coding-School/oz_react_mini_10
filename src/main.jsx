import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import MovieDetail from './component/MovieDetail.jsx';
import Layout from './component/Layout.jsx';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="movie/:movieId" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
);