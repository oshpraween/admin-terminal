import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Empty } from 'antd/lib';
import { theme } from 'antd';

const { useToken } = theme;

interface AntCardEmptyProps {
  text?: string;
  icon?: React.ReactNode;
  className?: string;
}

const AntCardEmpty: React.FC<AntCardEmptyProps> = (props) => {
  const { token } = useToken();
  const {
    className,
    text = 'Empty',
    icon = <ClockCircleOutlined className="text-3xl text-secondary-border" />,
  } = props;
  return (
    <Empty
      styles={{
        image: { height: 'fit-content' },
        description: {
          fontSize: 10,
          color: token.colorTextSecondary,
          padding: 4,
        },
      }}
      image={icon}
      description={text}
      className={`m-auto ${className}`}
    />
  );
};

export default AntCardEmpty;
