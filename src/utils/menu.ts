import { AppRouteObject } from 'src/types/router/router';
import { routes } from 'src/routes';

export const buildMenu = (
  routes: AppRouteObject[],
  parentPath = ''
): AppRouteObject[] => {
  return routes.map((route: AppRouteObject) => {
    const fullPath =
      `${parentPath}/${route.index ? '' : (route.path ?? '')}`.replace(
        /\/+/g,
        '/'
      );

    return {
      path: fullPath,
      title: route.title,
      isCashInMainLayout: route.isCashInMainLayout,
      key: fullPath,
      icon: 'icon' in route ? route.icon : undefined, // Handle missing 'icon'
      children: route.children
        ? buildMenu(route.children, fullPath)
        : undefined,
    };
  });
};

const _findMenu = (
  routes: AppRouteObject[],
  key: string
): AppRouteObject | undefined => {
  for (const route of routes) {
    if (route.key === key) return route;
    if (route.children) {
      const found = _findMenu(route.children, key);
      if (found) return found;
    }
  }
  return undefined;
};

export const findMenuByPath = (key: string): AppRouteObject | undefined => {
  const rootRoute = routes.find((r: AppRouteObject) => r.path === '/');
  if (!rootRoute || !rootRoute.children) return undefined;

  return _findMenu(rootRoute.children, key);
};
