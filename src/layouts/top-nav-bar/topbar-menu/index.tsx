import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AppRouteObject } from 'src/types/router/router';

import { AppstoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRecentButtonClick } from 'src/hooks/use-recent-click';

type MenuItem = Required<MenuProps>['items'][number];
type Props = {
  menuItems: AppRouteObject[];
};

const TopBarMenu: React.FC<Props> = ({ menuItems }) => {
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
          label: menuItem.title?.toUpperCase(),
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
            {menuItem.title?.toUpperCase()}
          </Link>
        ),
      };
    });
  }, [menuItems]);

  return (
    <Menu
      className="font-semibold"
      mode="horizontal"
      items={antMenuItems}
      defaultSelectedKeys={[window.location.pathname]}
    />
  );
};

export default TopBarMenu;
