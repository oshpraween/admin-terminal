import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavouriteTabs } from 'src/store/reducer/settings.slice';
import AntCard from 'src/components/shared-components/ant-card';
import { Button, List, Space, Typography } from 'antd';
import { FileOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { findMenuByPath } from 'src/utils/menu';
import { useRouter } from 'src/hooks/use-router';
import { toggleMenuSearch } from 'src/store/reducer/layout.slice';
import { useRecentButtonClick } from 'src/hooks/use-recent-click';
import AntCardEmpty from 'src/components/shared-components/ant-card/AntCardEmpty';

const { Text } = Typography;

const FavouritesCard: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const tabs = useSelector(selectFavouriteTabs);
  const { handleClick } = useRecentButtonClick();

  const favouriteTabs = useMemo(
    () =>
      tabs.map((tab) => {
        const menu = findMenuByPath(tab.path.replace(/^./, ''));
        return {
          ...tab,
          title: menu?.label || tab.title || 'Untitled',
          icon: menu?.icon || <FileOutlined className="text-primary" />,
          isCashInMainLayout: menu?.isCashInMainLayout,
        };
      }),
    [tabs]
  );

  const onClickFavouriteItem = (item: {
    path: string;
    title: string;
    isCashInMainLayout: boolean;
  }) => {
    router.push(item.path || '/');

    handleClick({
      path: item.path,
      title: item.title,
      isCash: item.isCashInMainLayout || false,
    });
  };

  return (
    <AntCard title={'Favourites'}>
      {favouriteTabs.length === 0 ? (
        <AntCardEmpty
          text={'Your favourite menu items will appear here.'}
          icon={<StarOutlined className="text-4xl text-secondary-border" />}
          className={'absolute top-0 left-0 right-0 bottom-0 h-fit'}
        />
      ) : (
        <List
          className="pl-1 max-h-[50vh] overflow-y-auto"
          itemLayout="horizontal"
          dataSource={favouriteTabs}
          renderItem={(item) => (
            <List.Item
              style={{ borderBottom: 'none' }}
              className="font-normal cursor-pointer hover:bg-secondary-hover rounded-lg"
              onClick={() =>
                onClickFavouriteItem({
                  path: item.path,
                  title:
                    typeof item.title === 'string' ? item.title : 'Untitled',
                  isCashInMainLayout: item.isCashInMainLayout || false,
                })
              }
            >
              <List.Item.Meta
                className="pl-2"
                avatar={<span className="text-primary">{item.icon}</span>}
                description={
                  <Text className="font-medium text-antCard-header-text2 !mb-0">
                    {item.title}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      )}
      <Space className="flex absolute w-full left-0 bottom-0 border-t border-secondary-border items-center justify-center">
        <Button
          size="small"
          type="link"
          className="my-1 text-md !text-primary"
          onClick={() => {
            dispatch(toggleMenuSearch());
          }}
        >
          <PlusOutlined /> Add Menu
        </Button>
      </Space>
    </AntCard>
  );
};
export default FavouritesCard;
