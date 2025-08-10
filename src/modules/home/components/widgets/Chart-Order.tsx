// src/index.tsx
import React from 'react';
import type { ProgressProps } from 'antd';
import { Flex, Progress } from 'antd';

const ChartOrder: React.FC = () => {
  const twoColors: ProgressProps['strokeColor'] = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };

  const conicColors: ProgressProps['strokeColor'] = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
  };

  return (
    <Flex vertical gap="middle">
      <Progress percent={99.9} strokeColor={twoColors} />
      <Progress
        percent={50}
        status="active"
        strokeColor={{ from: '#108ee9', to: '#87d068' }}
      />

      <Flex gap="large" wrap justify="center" align="center">
        <Progress type="dashboard" percent={90} strokeColor={twoColors} />
        <Progress type="dashboard" percent={93} strokeColor={conicColors} />
      </Flex>
    </Flex>
  );
};

export default ChartOrder;
