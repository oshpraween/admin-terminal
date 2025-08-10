// Your HomePage component file (index.tsx or HomePage.tsx)
import React from 'react';
import { Layout, Typography, Row, Col, Card } from 'antd';
import PermissionGuard from 'src/guards/permission-guard';
import { HOME_DASHBOARD_VIEW } from 'src/constants/permissions.constants';
import RecentCard from 'src/modules/home/components/RecentCard';
import FavouritesCard from 'src/modules/home/components/FavouritesCard';
import WidgetSlotGrid from './components/widgets/WidgetSlotGrid';

import Greeting from 'src/modules/home/components/Greeting';

const { Content } = Layout;

const HomePage: React.FC = () => {
  const userName = 'Ahamed'; // Or get dynamically from auth/user context

  return (
    <PermissionGuard
      requiredPermission={HOME_DASHBOARD_VIEW}
      isPermissionExists={false}
    >
      <Layout className="h-screen p-4 overflow-hidden">
        <Content className="flex flex-col h-full">
          {/* Replace hardcoded greeting with Greeting component */}
          <Greeting name={userName} />

          {/* Main content area */}
          <div className="flex-1 overflow-hidden">
            <Row gutter={[15, 50]} className="h-full py-2">
              {/* Recents */}
              <Col span={4}>
                <RecentCard />
              </Col>

              {/* Favorites */}
              <Col span={4}>
                <FavouritesCard />
              </Col>
              <Col span={16} className="h-full overflow-visible min-h-0">
                <WidgetSlotGrid />
              </Col>
            </Row>
          </div>

          {/* Bottom Wiki section (Fixed height) */}
          <Card
            className="rounded-lg mt-1"
            style={{ height: '5rem' }}
            bodyStyle={{
              padding: '17px 18px 13px 15px',
            }}
          >
            {/* ... your existing market data grid */}
          </Card>
        </Content>
      </Layout>
    </PermissionGuard>
  );
};

export default HomePage;
