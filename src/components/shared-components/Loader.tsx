import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';
import { Spin } from 'antd';

const Loader: React.FC = () => {
  const loading = useSelector((state: RootState) => state.loader.loading);

  if (!loading) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <Spin size="large" />
    </div>
  );
};

export default Loader;
