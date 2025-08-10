import React, { useMemo, useCallback } from 'react';
import { Card, Dropdown, Typography, theme, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import {
  SettingOutlined,
  DragOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { DragHandleBindings } from './SortableSlot';

const { Text } = Typography;

interface WidgetCardProps {
  widget: { id: string; title: string; description?: string; color?: string };
  slotId: string;
  onRemove?: (slotId: string) => void;
  dragHandle?: DragHandleBindings;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
  widget,
  slotId,
  onRemove,
  dragHandle,
}) => {
  const { token } = theme.useToken();

  const items = useMemo<MenuProps['items']>(
    () => [
      {
        key: 'about',
        label: 'About',
        icon: <InfoCircleOutlined />,
        className: '!px-3 !py-1',
      },
      {
        key: 'remove',
        label: 'Remove',
        icon: <DeleteOutlined />,
        className: '!px-3 !py-1',
        danger: true,
      },
    ],
    []
  );

  type MenuInfo = Parameters<NonNullable<MenuProps['onClick']>>[0];
  const onMenuClick = React.useCallback(
    (info: MenuInfo) => {
      const { key } = info;
      if (key === 'remove' && onRemove) onRemove(slotId);
      if (key === 'about') {
        // open about modal/drawer
      }
    },
    [onRemove, slotId]
  );

  const extra = (
    <div className="flex items-center gap-1 opacity-80 transition-opacity group-hover:opacity-100">
      <Dropdown
        trigger={['click']}
        placement="bottomRight"
        menu={{ items, onClick: onMenuClick }}
        // Avoid clipping if any parent has overflow hidden:
        getPopupContainer={() => document.body}
      >
        <button
          className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          type="button"
          aria-haspopup="menu"
          aria-label="Widget menu"
          onClick={(e) => e.stopPropagation()}
        >
          <SettingOutlined />
        </button>
      </Dropdown>

      {dragHandle && (
        <Tooltip title="Drag to reorder">
          <button
            ref={dragHandle.setActivatorNodeRef}
            {...dragHandle.attributes}
            {...dragHandle.listeners}
            className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 cursor-move"
            type="button"
            aria-label="Drag to reorder"
            onClick={(e) => e.stopPropagation()}
          >
            <DragOutlined />
          </button>
        </Tooltip>
      )}
    </div>
  );

  return (
    <Card
      className="h-full group"
      title={
        <Tooltip title={widget.title}>
          <span
            className="font-normal text-xs block truncate max-w-[16rem]"
            style={{ color: token.colorText }}
          >
            {widget.title}
          </span>
        </Tooltip>
      }
      extra={extra}
      style={{ backgroundColor: widget.color || token.colorBgContainer }}
      styles={{
        header: {
          backgroundColor: token.colorBgContainer,
          padding: '5px 5px 5px 10px',
          minHeight: 35,
          display: 'flex',
          alignItems: 'center',
        },
        body: { padding: 10 },
      }}
    >
      <Text type="secondary">{widget.description || ''}</Text>
      {/* widget content goes here */}
    </Card>
  );
};

export default React.memo(WidgetCard);
