import React from 'react';
import { Space } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Title from 'src/components/shared-components/Title';
import UserMenu from './components/user-menu';
import MenuSearch from 'src/components/menu-search';

const FixedTopBar: React.FC = () => {
  return (
    <Header className="flex justify-between items-center sticky top-0 z-10 p-0 px-3 leading-none w-full">
      <Space>
        <Title level={4} className="tracking-wide mr-5">
          FINEXA
        </Title>
        <MenuSearch />
      </Space>
      <UserMenu />
    </Header>
  );
};

export default FixedTopBar;
