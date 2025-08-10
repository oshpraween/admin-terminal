import { routes } from 'src/routes';
import { buildMenu } from 'src/utils/menu';
import TopBarMenu from './topbar-menu';

const TopNavBar = () => {
  const rootRoute = routes.find((r) => r.path === '/');
  const menuItems = rootRoute?.children
    ? buildMenu(rootRoute.children, '')
    : [];

  return <TopBarMenu menuItems={menuItems} />;
};

export default TopNavBar;
