import React from 'react';
import type { StatisticProps } from 'antd';
import { Col, Row, Statistic } from 'antd';

// Fallback formatter using native JavaScript
const formatter: StatisticProps['formatter'] = (value) => {
  return new Intl.NumberFormat('en-US').format(Number(value));
};

const StatsPanel: React.FC = () => (
  <div>
    {/* Row 1 */}
    <Row gutter={16} className="mb-4">
      <Col span={12}>
        <Statistic title="Active Users" value={112893} formatter={formatter} />
      </Col>
      <Col span={12}>
        <Statistic
          title="Account Balance (SAR)"
          value={112893}
          precision={2}
          formatter={formatter}
        />
      </Col>
    </Row>

    {/* Row 2 */}
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Monthly Visits" value={52893} formatter={formatter} />
      </Col>
      <Col span={12}>
        <Statistic title="New Signups" value={3452} formatter={formatter} />
      </Col>
    </Row>
  </div>
);

export default StatsPanel;
