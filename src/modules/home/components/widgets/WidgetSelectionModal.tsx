import React, { useMemo, useState } from 'react';
import { Modal, Row, Col, Typography, Button, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';
import { assignWidgetToSlot } from 'src/store/reducer/dashboardWidgets.slice';
import { SearchOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

interface WidgetSelectionModalProps {
  visible: boolean;
  slotId: string | null;
  onClose: () => void;
}

const WidgetSelectionModal: React.FC<WidgetSelectionModalProps> = ({
  visible,
  slotId,
  onClose,
}) => {
  const dispatch = useDispatch();
  const allWidgets = useSelector(
    (state: RootState) => state.dashboardWidget.allWidgets
  );
  const slotMapping = useSelector(
    (state: RootState) => state.dashboardWidget.slotMapping
  );
  const selectedWidgetIds = Object.values(slotMapping);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWidgets = useMemo(
    () =>
      allWidgets.filter(({ title, description }) =>
        (title + description).toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, allWidgets]
  );

  const handleSelect = (widgetId: string) => {
    if (slotId) {
      dispatch(assignWidgetToSlot({ slotId, widgetId }));
      onClose();
    }
  };

  return (
    <Modal
      open={visible}
      title={
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">Select a Widget</div>
          <Input
            prefix={<SearchOutlined className="text-primary mr-2" />}
            size="small"
            placeholder="Search widgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[200px] !shadow-none hover:border-primary"
            allowClear
          />
        </div>
      }
      footer={
        <div className="text-right">
          <Button
            onClick={onClose}
            type="primary"
            className="h-6 px-6 bg-primary"
          >
            Close
          </Button>
        </div>
      }
      width={900}
      onCancel={onClose}
      closable={false}
      styles={{
        content: {
          padding: '18px 20px 20px',
        },
        body: {
          padding: '32px 40px 20px',
          maxHeight: '65vh',
          overflowY: 'auto',
        },
      }}
    >
      <Row gutter={[24, 24]}>
        {filteredWidgets.map((widget) => {
          const isSelected = selectedWidgetIds.includes(widget.id);
          return (
            <Col xs={24} sm={12} md={8} key={widget.id}>
              <div
                className={`group relative h-[306px] overflow-hidden rounded-[12px] border border-gray-200 shadow-sm flex flex-col justify-end transition-shadow ${
                  isSelected ? 'cursor-not-allowed opacity-50' : ''
                }`}
                style={{ backgroundColor: widget.color }}
              >
                {!isSelected && (
                  <div
                    onClick={() => handleSelect(widget.id)}
                    className="absolute opacity-50 top-0 left-0 right-0 h-10 bg-white/90 flex justify-center items-center font-medium text-gray-600 -translate-y-full transition-transform duration-200 ease-in-out group-hover:translate-y-0 group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)] cursor-pointer"
                  >
                    <span className="text-md">+ Add</span>
                  </div>
                )}
                <div className="flex flex-col justify-end h-full">
                  <div className="bg-white rounded-b-[12px] px-3 py-2 h-[70px]">
                    <Text strong className="block mb-1">
                      {widget.title}
                    </Text>
                    <Paragraph className="text-xs text-gray-400 m-0 line-clamp-2 oveflow-wrap">
                      {widget.description}
                    </Paragraph>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Modal>
  );
};

export default WidgetSelectionModal;
