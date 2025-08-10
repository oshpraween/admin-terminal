import { Link } from 'react-router-dom';
import { AppRouteObject } from 'src/types/router/router';
import { GetProp, Menu, MenuProps } from 'antd';
import { useMemo } from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { useRecentButtonClick } from 'src/hooks/use-recent-click';

type Props = {
  menuItems: AppRouteObject[];
};

type MenuItem = GetProp<MenuProps, 'items'>[number];

const SliderMenu = ({ menuItems }: Props) => {
  const { handleClick } = useRecentButtonClick();
  const antMenuItems: MenuItem[] = useMemo(() => {
    const processChildren = (
      children: AppRouteObject[] | undefined
    ): MenuItem[] => {
      if (!children) return []; // Return an empty array instead of undefined
      return children.map((child: AppRouteObject) => {
        if (child.children && child.children.length > 0) {
          return {
            key: child.key ?? '', // Ensure key is a string
            icon: 'icon' in child ? child.icon : <AppstoreOutlined />, // Handle missing 'icon'
            label: child.title,
            children: processChildren(child.children),
          };
        }

        return {
          key: child.key ?? '', // Ensure key is a string
          icon: 'icon' in child ? child.icon : <AppstoreOutlined />, // Handle missing 'icon'
          label: (
            <Link
              to={`${child.key}`}
              onClick={() => {
                handleClick({
                  path: child.path,
                  title: child.title,
                  isCash: child.isCashInMainLayout || false,
                });
              }}
            >
              {child.title}
            </Link>
          ),
        };
      });
    };

    return menuItems.map((menuItem: AppRouteObject) => {
      if (menuItem.children && menuItem.children.length > 0) {
        return {
          key: menuItem.key ?? '', // Ensure key is a string
          icon: 'icon' in menuItem ? menuItem.icon : <AppstoreOutlined />, // Handle missing 'icon'
          label: menuItem.title,
          children: processChildren(menuItem.children),
        };
      }

      return {
        key: menuItem.key ?? '', // Ensure key is a string
        icon: 'icon' in menuItem ? menuItem.icon : <AppstoreOutlined />, // Handle missing 'icon'
        label: (
          <Link
            to={`${menuItem.key}`}
            onClick={() => {
              handleClick({
                path: menuItem.path,
                title: menuItem.title,
                isCash: menuItem.isCashInMainLayout || false,
              });
            }}
          >
            {menuItem.title}
          </Link>
        ),
      };
    });
  }, [menuItems]);

  return (
    <Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={antMenuItems}
    />
  );
};

export default SliderMenu;
