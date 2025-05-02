import React from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import MainPage from './page/MainPage';
import MovieDetail from './component/MovieDetail';
import Layout from './component/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<MainPage />} />
      <Route path="movie/:id" element={<MovieDetail />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
