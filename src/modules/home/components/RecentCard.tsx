import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearRecentTabs,
  selectRecentTabs,
} from 'src/store/reducer/settings.slice';
import AntCard from 'src/components/shared-components/ant-card';
import { List, Typography } from 'antd';
import { FileOutlined } from '@ant-design/icons';
import { findMenuByPath } from 'src/utils/menu';
import { useRouter } from 'src/hooks/use-router';

const { Text } = Typography;

const RecentCard: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const tabs = useSelector(selectRecentTabs);

  const recentTabs = useMemo(
    () =>
      tabs.map((tab) => {
        const menu = findMenuByPath(tab.path.replace(/^./, ''));
        return {
          ...tab,
          title: menu?.label || tab.title || 'Untitled',
          icon: menu?.icon || <FileOutlined className="text-primary" />,
        };
      }),
    [tabs]
  );

  return (
    <AntCard
      title={'Recents'}
      emptyText="Recently accessed items will appear here."
      showClearButton={recentTabs.length > 0}
      onClear={() => {
        dispatch(clearRecentTabs());
      }}
    >
      {recentTabs.length === 0 ? null : (
        <List
          className="pl-1 max-h-[50vh] overflow-y-auto"
          itemLayout="horizontal"
          dataSource={recentTabs}
          renderItem={(item) => (
            <List.Item
              style={{ borderBottom: 'none' }}
              className="font-normal cursor-pointer hover:bg-secondary-hover rounded-lg"
              onClick={() => router.push(item.path)}
            >
              <List.Item.Meta
                className={'pl-2'}
                avatar={
                  <span className="text-primary text-lg">{item.icon}</span>
                }
                description={
                  <Text className="font-medium text-xs text-antCard-header-text2">
                    {item.title}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      )}
    </AntCard>
  );
};
export default RecentCard;
