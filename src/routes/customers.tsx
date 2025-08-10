import { lazy } from 'react';
import { withKeepAlive } from 'src/components/cashing-container';
import { AppRouteObject } from 'src/types/router/router';
import {
  UsergroupAddOutlined,
  UserOutlined,
  IdcardOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

const MyCustomersPage = lazy(
  () => import('src/modules/customers/my-customers')
);

const CustomerDetailsPage = withKeepAlive('/customers/my-customers/sub')(
  lazy(() => import('src/modules/customers/customer-details'))
);

const CustomerDetailsPage2 = withKeepAlive('customers/customers-details')(
  lazy(() => import('src/modules/customers/customer-details'))
);

export const CustomersRoutes: AppRouteObject[] = [
  {
    path: 'customers',
    title: 'Customers',
    children: [
      {
        path: 'my-customers',
        title: 'New Customers',
        icon: <UserAddOutlined />,
        description: 'My Customers Description Here',
        children: [
          {
            path: 'sub',
            element: <CustomerDetailsPage title="My Customers Sub Page" />,
            title: 'Individual Accounts',
            isCashInMainLayout: true,
            icon: <UserOutlined />,
            key: 'customers/my-customers/sub',
            description: 'My Customers Sub Page Description Here',
          },
          {
            path: 'sub-2',
            element: <MyCustomersPage />,
            title: 'Corporate Accounts',
            isCashInMainLayout: true,
            icon: <IdcardOutlined />,
            key: 'customers/my-customers/sub-2',
            description: 'My Customers Sub Page Description Here',
          },
        ],
        key: 'customers/my-customers',
      },
      {
        path: 'customers-details',
        element: <CustomerDetailsPage2 title="Customer Details" />,
        title: 'My Customers',
        isCashInMainLayout: true,
        icon: <UsergroupAddOutlined />,
        key: 'customers/customers-details',
        description: 'Customer Details Page Description Here',
      },
    ],
    key: 'customers',
    icon: <UsergroupAddOutlined />,
  },
];
