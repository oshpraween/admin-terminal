import { AppRouteObject } from 'src/types/router/router';

export interface PathItem {
  path: string;
  title?: string;
  isCashInMainLayout?: boolean;
  icon?: React.ReactNode;
  description?: string;
  isElementFound?: boolean;
}

export const getRoutePaths = (
  routes: AppRouteObject[],
  parentPath: string = ''
): PathItem[] => {
  return routes.reduce<PathItem[]>((paths, route) => {
    const fullPath = route.index
      ? parentPath
      : `${parentPath}${route.path || ''}`.replace('//', '/');

    const currentPaths: PathItem[] = [];

    if (route.path || route.index) {
      const pathItem: PathItem = {
        path: fullPath || '/',
      };

      if (route.title !== undefined) {
        pathItem.title = route.title;
      }

      if (route.isCashInMainLayout !== undefined) {
        pathItem.isCashInMainLayout = route.isCashInMainLayout;
      }

      if (route.icon) {
        pathItem.icon = route.icon;
      }

      if (route.description) {
        pathItem.description = route.description;
      }

      if (route.element) {
        pathItem.isElementFound = true;
      }

      currentPaths.push(pathItem);
    }

    if (route.children) {
      currentPaths.push(...getRoutePaths(route.children, `${fullPath}/`));
    }

    return [...paths, ...currentPaths];
  }, []);
};
