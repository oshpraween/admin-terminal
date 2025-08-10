import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addRecentTab as navAddRecentTab } from 'src/store/reducer/settings.slice';
import { routes } from 'src/routes';
import { addRecentTab } from 'src/store/reducer/layout.slice';
import { AppRouteObject } from 'src/types/router/router';

type RecentButtonClick = {
  path: string | undefined;
  title: string | undefined;
  isCash: boolean;
};

export function useRecentButtonClick() {
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (options: RecentButtonClick) => {
      const { path, title, isCash } = options;

      if (path) {
        if (isCash && path && title) {
          dispatch(addRecentTab({ path, title }));
        }

        const parentPath = path.split('/')[1];

        if (path && title && parentPath) {
          const rootRoute = routes.find(
            (r) => r.path === '/'
          ) as AppRouteObject;

          if (rootRoute && rootRoute.children) {
            const parentRoute = rootRoute.children.find(
              (r) => r.path === parentPath
            ) as AppRouteObject;

            if (parentRoute) {
              dispatch(
                navAddRecentTab({
                  key: path,
                  path,
                  title,
                })
              );
            }
          }
        }
      }
    },
    [dispatch]
  );

  return { handleClick };
}
