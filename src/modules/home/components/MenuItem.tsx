import React from 'react';
import { List, Typography, Space } from 'antd';

const { Text } = Typography;

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label }) => (
  <List.Item>
    <Space>
      {icon}
      <Text>{label}</Text>
    </Space>
  </List.Item>
);

export default MenuItem;
