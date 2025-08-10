import { routes } from 'src/routes';
import { buildMenu } from 'src/utils/menu';
import SliderMenu from './sider-menu';
import { Flex, Layout } from 'antd';
import { selectShowSideBar } from 'src/store/reducer/layout.slice';
import { useSelector } from 'react-redux';
import { useContext, useEffect, useRef, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ThemeContext } from 'src/theme/theme-context';
const { Sider } = Layout;

const AntSlider = () => {
  const rootRoute = routes.find((r) => r.path === '/');
  const menuItems = rootRoute?.children
    ? buildMenu(rootRoute.children, '')
    : [];
  const showSideBar = useSelector(selectShowSideBar);

  const sliderRef = useRef(null);
  const [collapsed, setCollapsed] = useState(true);

  const { theme } = useContext(ThemeContext);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    if (!showSideBar) {
      setCollapsed(true);
    }
  }, [showSideBar]);
  return (
    <Sider
      theme={theme}
      ref={sliderRef}
      className="h-fixed-header sticky left-0 scrollbar-thin scrollbar-stable"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={256}
      collapsedWidth={showSideBar ? 60 : 0}
      trigger={null}
    >
      <Flex vertical className="w-full h-full">
        <SliderMenu menuItems={menuItems} />
        <Flex
          className="w-full py-4 cursor-pointer"
          align={'center'}
          justify={'end'}
          flex={1}
          vertical={true}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <MenuUnfoldOutlined className="dark:text-text-secondary" />
          ) : (
            <MenuFoldOutlined className="dark:text-text-secondary" />
          )}
        </Flex>
      </Flex>
    </Sider>
  );
};

export default AntSlider;
