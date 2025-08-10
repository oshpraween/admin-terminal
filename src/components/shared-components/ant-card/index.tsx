import { Button, Card, ConfigProvider, Flex, Space } from 'antd';
import React from 'react';
import AntCardEmpty from 'src/components/shared-components/ant-card/AntCardEmpty';
import { CloseOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface MenuCardProps {
  title: string;
  children?: React.ReactNode;
  emptyText?: string;
  emptyIcon?: React.ReactNode;
  showClearButton?: boolean;
  onClear?: () => void;
}

const AntCard: React.FC<MenuCardProps> = ({
  title,
  children,
  emptyText,
  emptyIcon,
  showClearButton = false,
  onClear,
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            bodyPadding: 20,
            borderRadiusLG: 10,
            colorTextHeading: 'var(--antCard-header-text)',
            fontSize: 13,
            algorithm: true,
          },
          List: {
            itemPadding: '8px 0 8px 0',
          },
        },
      }}
    >
      <Card className="h-full w-full grid grid-cols-1 shadow-sm overflow-y-auto relative">
        <Flex flex={1} className="w-full h-full" vertical={true}>
          <Meta
            title={title}
            className="text-secondary-text text-sm font-semibold pb-7 leading-3"
          />
          <Flex flex={1} className="h-full w-full" vertical={true}>
            {children ? (
              children
            ) : (
              <AntCardEmpty
                text={emptyText}
                icon={emptyIcon}
                className="absolute top-0 left-0 right-0 bottom-0 h-fit"
              />
            )}
          </Flex>
          {showClearButton && (
            <Flex
              align="end"
              vertical={false}
              justify="space-between"
              flex={0}
              className="w-full"
            >
              <Space className="flex absolute w-full left-0 bottom-0 border-t border-secondary-border items-center justify-center">
                <Button
                  size="small"
                  type="link"
                  className="my-1 text-md !text-primary"
                  onClick={onClear}
                >
                  <CloseOutlined /> Clear
                </Button>
              </Space>
            </Flex>
          )}
        </Flex>
      </Card>
    </ConfigProvider>
  );
};
export default AntCard;
