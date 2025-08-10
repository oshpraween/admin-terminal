import React from 'react';
import { ConfigProvider, Menu } from 'antd';
import type { MenuItemType, MenuItemGroupType } from 'antd/es/menu/interface';

import {
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  UserOutlined,
  WifiOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  CopyOutlined,
} from '@ant-design/icons';

export interface ContextMenuProps {
  onAction: (action: string) => void;
  highlight?: string;
}

// Explicitly type items for Menu
const contextMenuItems: (MenuItemType | MenuItemGroupType<MenuItemType>)[] = [
  {
    key: 'edit',
    icon: <EditOutlined />,
    label: 'Edit',
    type: 'item',
  },
  {
    key: 'view',
    icon: <EyeOutlined />,
    label: 'View',
    type: 'item',
  },
  {
    key: 'delete',
    icon: <UserOutlined />,
    label: 'Delete',
    type: 'item',
  },
  {
    key: 'customer-summary',
    icon: <WifiOutlined />,
    label: 'Customer Summery',
    type: 'item',
  },
  {
    key: 'audit-trail',
    icon: <FileTextOutlined />,
    label: 'Audit Trail',
    type: 'item',
  },
  {
    key: 'view-restrictions',
    icon: <DeleteOutlined />,
    label: 'View Restrictions',
    type: 'item',
  },
  {
    key: 'customer-block',
    icon: <InfoCircleOutlined />,
    label: 'Customer block',
    type: 'item',
  },
  {
    key: 'copy-cell',
    icon: <CopyOutlined />,
    label: 'Copy Current Cell',
    type: 'item',
  },
];

export const ContextMenuPopover: React.FC<ContextMenuProps> = ({
  onAction,
  highlight,
}) => {
  const items: (MenuItemType | MenuItemGroupType<MenuItemType>)[] =
    contextMenuItems.map((item) =>
      item.key === highlight
        ? {
            ...item,
            style: { background: '#2436b8', color: 'white' },
            label: (
              <span style={{ color: 'white' }}>
                {typeof item.label === 'string' ? item.label : item.label}
              </span>
            ),
          }
        : item
    );

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHoverBg: '#2436b8',
            itemHoverColor: 'white',
          },
        },
      }}
    >
      <Menu
        items={items}
        onClick={({ key }) => onAction(key)}
        className="min-w-[220px] p-2 rounded-lg shadow-lg"
      />
    </ConfigProvider>
  );
};
