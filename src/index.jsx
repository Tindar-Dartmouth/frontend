import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import {
  useParams, RouterProvider, createBrowserRouter, Outlet,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail1 from './pages/VerifyEmail1';
import VerifyEmail2 from './pages/VerifyEmail2';
import UserQuestions from './pages/UserQuestions';
import Recruiting from './pages/Recruiting';
import LandingPage from './pages/LandingPage';
import Endorsements from './pages/Endorsements';
import UserProfile from './pages/UserProfile';
import OtherProfile from './pages/OtherProfile';
import Leaderboard from './pages/Leaderboard';
import Connections from './pages/Connections';

function Layout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

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
      { path: 'verifyEmail1', element: <VerifyEmail1 /> },
      { path: 'verifyEmail2', element: <VerifyEmail2 /> },
      { path: 'user-questionnaire', element: <UserQuestions /> },
      { path: 'recruiting', element: <Recruiting /> },
      { path: 'connections', element: <Connections /> },
      { path: 'endorsements', element: <Endorsements /> },
      { path: 'leaderboard', element: <Leaderboard /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'profile/:userID', element: <OtherProfile /> },
      { path: 'about', element: <About /> },
      { path: 'test/:id', element: <Test /> },
      { path: '*', element: <FallBack /> },
    ],
  },
]);

const root = createRoot(document.getElementById('main'));

root.render(
  <RouterProvider router={router} />,
);
