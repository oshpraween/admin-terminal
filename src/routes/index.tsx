import { lazy } from 'react';
import AuthGuard from 'src/guards/auth-guard';
import { CustomersRoutes } from './customers';
import { SystemRoutes } from './system';
import LayoutWrapper from 'src/layouts/layout-wrapper';
import { AppRouteObject } from 'src/types/router/router';
import NotFound from 'src/pages/not-found';
import {
  BarChartOutlined,
  HomeOutlined,
  LineChartOutlined,
} from '@ant-design/icons';

const HomePage = lazy(() => import('src/modules/home'));
const LoginPage = lazy(() => import('src/modules/auth/login'));
const TradingPage = lazy(() => import('src/modules/trading'));

export const routes: AppRouteObject[] = [
  {
    path: '/',
    element: (
      <AuthGuard>
        <LayoutWrapper></LayoutWrapper>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        title: 'Home',
        element: <HomePage />,
        key: '',
        icon: <HomeOutlined />,
        description: 'Home Page Description Here',
      },
      ...CustomersRoutes,
      {
        path: 'trading',
        title: 'Trading',
        element: <TradingPage />,
        key: 'trading',
        icon: <LineChartOutlined />,
        description: 'Trading Page Description Here',
      },
      {
        path: 'holding',
        title: 'Holding',
        element: <NotFound />,
        key: 'holding',
        icon: <BarChartOutlined />,
        description: 'Holding Page Description Here',
      },
      ...SystemRoutes,
    ],
    title: 'Main Layout',
    key: 'main-layout',
  },
  {
    path: '/login',
    element: <LoginPage />,
    title: 'Login',
    key: 'login',
  },
  // Add 404 page as catch-all route
  {
    path: '*',
    element: <NotFound />,
    title: 'Not Found',
    key: 'not-found',
  },
];
