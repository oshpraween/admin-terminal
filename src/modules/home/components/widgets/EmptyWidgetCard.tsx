import React from 'react';
import { Card, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface EmptyWidgetCardProps {
  slotId: string;
  onClick: (slotId: string) => void;
}

const EmptyWidgetCard: React.FC<EmptyWidgetCardProps> = ({
  slotId,
  onClick,
}) => {
  return (
    <Card
      onClick={() => onClick(slotId)}
      hoverable
      className="w-full h-full flex items-center justify-center border-dashed cursor-pointer hover:border-gray-300 hover:border-2 shadow-sm hover:shadow-none hover:bg-gray-100"
    >
      <div className="text-center text-primary">
        <PlusOutlined className="text-2xl" />
        <div>
          <Text type="secondary" className="!text-primary hover:font-semibold">
            Add Widget
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default EmptyWidgetCard;
