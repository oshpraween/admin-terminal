import React from 'react';
import { Layout, Typography, Row, Col, Card } from 'antd';
import PermissionGuard from 'src/guards/permission-guard';
import { HOME_DASHBOARD_VIEW } from 'src/constants/permissions.constants';
import RecentCard from 'src/modules/home/components/RecentCard';
import FavouritesCard from 'src/modules/home/components/FavouritesCard';
import WidgetSlotGrid from './components/widgets/WidgetSlotGrid';

const { Title, Text } = Typography;
const { Content } = Layout;

const HomePage: React.FC = () => {
  return (
    <PermissionGuard
      requiredPermission={HOME_DASHBOARD_VIEW}
      isPermissionExists={false}
    >
      <Layout className="h-screen p-4 overflow-hidden">
        <Content className="flex flex-col h-full">
          <Title level={3} className="mb-2">
            Good evening, Ahamed
          </Title>

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
            styles={{
              body: {
                padding: '17px 18px 13px 15px',
              },
            }}
          >
            <div className="grid grid-cols-7 gap-x-4 text-sm h-full">
              <div>
                <Text type="secondary">Total Market Cap</Text>
                <div>
                  <Text strong className="text-blue-600">
                    $2.45T
                  </Text>
                  <Text className="ml-1 text-xs text-green-600">+1.2%</Text>
                </div>
              </div>
              <div>
                <Text type="secondary">24h Volume</Text>
                <div>
                  <Text strong className="text-green-700">
                    $185B
                  </Text>
                  <Text className="ml-1 text-xs text-green-500">+8.1%</Text>
                </div>
              </div>
              <div>
                <Text type="secondary">Top Gainer</Text>
                <div>
                  <Text strong className="text-green-700">
                    AAPL +4.5%
                  </Text>
                  <Text className="ml-1 text-xs text-gray-400">Vol: 3.2M</Text>
                </div>
              </div>
              <div>
                <Text type="secondary">Top Loser</Text>
                <div>
                  <Text strong className="text-red-600">
                    TSLA -3.1%
                  </Text>
                  <Text className="ml-1 text-xs text-gray-400">Vol: 2.9M</Text>
                </div>
              </div>
              <div>
                <Text type="secondary">Most Traded</Text>
                <div>
                  <Text strong className="text-purple-600">
                    AMZN
                  </Text>
                  <Text className="ml-1 text-xs text-gray-400">
                    6.1M shares
                  </Text>
                </div>
              </div>
              <div>
                <Text type="secondary">Index</Text>
                <div>
                  <Text strong className="text-blue-700">
                    NASDAQ 13,555
                  </Text>
                  <Text className="ml-1 text-xs text-green-600">+0.98%</Text>
                </div>
              </div>
              <div>
                <Text type="secondary">Market Sentiment</Text>
                <div>
                  <Text strong className="text-yellow-600">
                    Neutral
                  </Text>
                  <Text className="ml-1 text-xs text-gray-400">
                    Volatility: Low
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </Content>
      </Layout>
    </PermissionGuard>
  );
};

export default HomePage;
