import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import GalleryDetail from './pages/GalleryDetail';
import LikePhoto from './pages/LikePhoto';
import AllPhoto from './pages/AllPhoto';
import PhotoDetail from './pages/PhotoDetail';
import RecommandPhoto from './pages/RecommandPhoto';
import Search from './pages/Search';
import Trash from './pages/Trash';
import ProtectedRoute from './pages/ProtectedRoute';
import UserPage from './pages/UserPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      {
        path: '/gallery',
        element: (
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        ),
      },
      {
        path: '/gallery/:galleryId',
        element: (
          <ProtectedRoute>
            <GalleryDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: '/like',
        element: (
          <ProtectedRoute>
            <LikePhoto />
          </ProtectedRoute>
        ),
      },
      {
        path: '/allPhoto/:categoryId',
        element: (
          <ProtectedRoute>
            <AllPhoto />
          </ProtectedRoute>
        ),
      },
      {
        path: '/allPhoto/:categoryId/:photoId',
        element: (
          <ProtectedRoute>
            <PhotoDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: '/recommand',
        element: (
          <ProtectedRoute>
            <RecommandPhoto />
          </ProtectedRoute>
        ),
      },
      {
        path: '/search',
        element: (
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        ),
      },
      {
        path: '/trash',
        element: (
          <ProtectedRoute>
            <Trash />
          </ProtectedRoute>
        ),
      },
      {
        path: '/user/:uid',
        element: (
          <ProtectedRoute>
            <UserPage/>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
