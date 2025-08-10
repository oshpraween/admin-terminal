import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from 'src/layouts/top-nav-bar';
import TopMenuBar from 'src/layouts/layout-wrapper/top-menu-bar';
import Loader from 'src/components/shared-components/Loader';
import FixedTopBar from 'src/layouts/fixed-topbar';
import { Flex, Layout } from 'antd';
import AntSlider from 'src/layouts/ant-slider';
import { useSelector } from 'react-redux';
import { selectShowSideBar } from 'src/store/reducer/layout.slice';

const { Content } = Layout;

const LayoutWrapper: FC = () => {
  const showSideBar = useSelector(selectShowSideBar);

  return (
    <>
      <FixedTopBar />
      <Layout>
        <AntSlider />
        <Layout>
          <Content className="w-full h-content">
            <Flex vertical={true} className="h-full" flex={1}>
              <Flex vertical={true} className="sticky top-0 w-full">
                {!showSideBar && <TopNavBar />}
                <TopMenuBar />
              </Flex>
              <Flex
                vertical={true}
                className="w-full overflow-auto"
                justify={'space-between'}
                flex={1}
              >
                <Outlet />
              </Flex>
            </Flex>
          </Content>
        </Layout>
      </Layout>
      <Loader />
    </>
  );
};

export default LayoutWrapper;
