import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeRecentTab,
  selectActiveTab,
  selectRecentTabs,
  setActiveTab,
} from 'src/store/reducer/layout.slice';
import { useAliveController } from 'react-activation';
import { useRouter } from 'src/hooks/use-router';
import { onStartLoading, onStopLoading } from 'src/store/reducer/loader.slice';
import { useLocation } from 'react-router-dom';
import { Button, Flex } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const TopMenuBar: React.FC = () => {
  const tabs = useSelector(selectRecentTabs);
  const activeTab = useSelector(selectActiveTab);

  const { drop } = useAliveController();
  const dispatch = useDispatch();
  const router = useRouter();
  const location = useLocation();

  const onClickClose = async (path: string) => {
    dispatch(onStartLoading());
    drop(path).then(() => {
      dispatch(removeRecentTab(path));
      dispatch(onStopLoading());
      const nextTabs = tabs.filter((t) => t.path !== path);
      if (nextTabs.length === 0) {
        router.replace('/');
      }
    });
  };

  const onTabClick = (path: string) => {
    const tab = tabs.find((t) => t.path === path);
    if (tab) {
      dispatch(setActiveTab(tab));
      router.push(path);
    }
  };

  return tabs.length > 0 && location.pathname !== '/' ? (
    <Flex
      vertical={false}
      gap={8}
      className="h-cashing-menu border-b px-sm border-border-secondary dark:border-dark-border-secondary py-0.5"
      align={'center'}
    >
      {tabs.map((tab) => (
        <Button
          size="small"
          key={tab.path}
          type={`${activeTab?.path === tab.path ? 'primary' : 'text'}`}
          onClick={() => onTabClick(tab.path)}
        >
          {tab.title}
          <CloseOutlined
            className="ml-0"
            onClick={(e) => {
              e.stopPropagation();
              onClickClose(tab.path);
            }}
          />
        </Button>
      ))}
    </Flex>
  ) : null;
};

export default TopMenuBar;
