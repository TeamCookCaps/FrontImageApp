import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Story from './pages/Story';
import StoryDetail from './pages/StoryDetail';
import LikePhoto from './pages/LikePhoto';
import AllPhoto from './pages/AllPhoto';
import PhotoDetail from './pages/PhotoDetail';
import RecommandPhoto from './pages/RecommandPhoto';
import Search from './pages/Search';
import Trash from './pages/Trash';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/story', element: <Story /> },
      { path: '/story/:storyId', element: <StoryDetail /> },
      { path: '/like', element: <LikePhoto /> },
      { path: '/allPhoto/:categoryId', element: <AllPhoto /> },
      { path: '/allPhoto/:categoryId/:photoId', element: <PhotoDetail /> },
      { path: '/recommand', element: <RecommandPhoto /> },
      { path: '/search', element: <Search /> },
      { path: '/trash', element: <Trash /> },
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
