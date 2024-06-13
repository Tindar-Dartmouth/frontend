import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import {
  useParams, RouterProvider, createBrowserRouter, Outlet,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

const LandingPage = lazy(() => import('./pages/LandingPage'));

function Layout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

// function Welcome() {
//   return (
//     <div>Welcome</div>
//   );
// }

function About() {
  return <div>All there is to know about me</div>;
}

function Test() {
  const { id } = useParams();
  return <div>ID: {id}</div>;
}

function FallBack() {
  return <div>URL Not Found</div>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      // { path: 'landing-page', element: <Suspense fallback={<div>Loading...</div>}><LandingPage /></Suspense> },
      { path: 'about', element: <About /> },
      { path: 'test/:id', element: <Test /> },
      { path: '*', element: <FallBack /> },
    ],
  },
]);

const root = createRoot(document.getElementById('main'));
root.render(<RouterProvider router={router} />);
