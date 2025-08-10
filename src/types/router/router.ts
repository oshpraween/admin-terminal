import { RouteObject } from 'react-router';

export interface AppRoute {
  title?: string;
  isCashInMainLayout?: boolean;
  description?: string;
  icon?: React.ReactNode; // Ensure icon type is compatible with Ant Design and React
}

export type AppRouteObject = RouteObject &
  AppRoute & {
    children?: AppRouteObject[];
    key: string; // Make key required for consistency in menu generation
    label?: React.ReactNode;
    icon?: React.ReactNode;
  };
