import React from 'react';
import { List, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MenuItem from './MenuItem';
import AntCard from 'src/components/shared-components/ant-card';

interface MenuItemType {
  icon: React.ReactNode;
  label: string;
}

interface MenuCardProps {
  items: MenuItemType[];
  isFavorite?: boolean;
}

const MenuCard: React.FC<MenuCardProps> = ({ items, isFavorite = false }) => {
  return (
    <AntCard
      title={'Favorite'}
      emptyText="Your favorite items can config here."
    >
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => <MenuItem icon={item.icon} label={item.label} />}
      />
      {isFavorite && (
        <>
          <Divider className="my-2" />
          <div className="text-center text-blue-500 cursor-pointer">
            <PlusOutlined /> Add Menu
          </div>
        </>
      )}
    </AntCard>
  );
};

export default MenuCard;
