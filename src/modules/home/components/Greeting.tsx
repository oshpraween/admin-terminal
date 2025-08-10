// src/modules/home/components/Greeting.tsx
import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

interface GreetingProps {
  name: string;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 18) return 'Good afternoon';
  if (hour >= 18 && hour < 21) return 'Good evening';
  return 'Good night';
};

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  const greeting = getGreeting();

  return (
    <Title level={3} style={{ margin: 0 }}>
      {greeting}, {name}
    </Title>
  );
};

export default Greeting;
