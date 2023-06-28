import { Navigate, useRoutes, Outlet } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Product';
import BlogDetail from './pages/BlogDetail';
import User from './pages/User';
import Login from './pages/Login';
import Request from './pages/Request';
import NotFound from './pages/Page404';
import NewJob from './pages/NewJob';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import PrivateRoute from './hoc/AuthGuard';
import Interview from './pages/Interview';
import InterviewerTask from './pages/InterviewerTask';
import HRManager from './pages/HRManager';
import Staffs from './pages/Staffs';

// ----------------------------------------------------------------------

import InterviewHOC from './pages/InterviewHOC';
import { useSelector } from 'react-redux';
export default function Router() {
  const { staff } = useSelector((state) => state.staff);
  return useRoutes([
    {
      element: <PrivateRoute />,
      children: [
        {
          path: '/dashboard',
          element: <DashboardLayout />,
          children: [
            { path: 'app', element: <DashboardApp /> },
            { path: 'user', element: <User /> },
            { path: 'products', element: <Products /> },
            { path: 'blog', element: <Blog /> },
            { path: 'blog/:id', element: <BlogDetail /> },
            {
              path: 'newJob/:id',
              element: <NewJob />,
            },

            {
              path: 'request',
              element: <Request />,
            },
            {
              path: 'interview',
              element: <InterviewHOC />,
            },
            {
              path: 'interview-task',
              element: <InterviewerTask />,
            },
            {
              path: 'hrmanager',
              element: <HRManager />,
            },
            {
              path: 'staffs',
              element: <Staffs />,
            },
          ],
        },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },

    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
