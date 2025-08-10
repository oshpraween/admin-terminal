import { lazy } from 'react';
import { AppRouteObject } from 'src/types/router/router';
import {
  SettingOutlined,
  GroupOutlined,
  PlusCircleOutlined,
  BankOutlined,
  AlertOutlined,
} from '@ant-design/icons';

const Institution = lazy(() => import('src/modules/system/institution'));

export const SystemRoutes: AppRouteObject[] = [
  {
    path: 'system',
    title: 'System',
    description: 'System Management Description Here',
    children: [
      {
        path: 'brokerages',
        element: <Institution title="Institution" />,
        title: 'Brokerages',
        isCashInMainLayout: true,
        icon: <GroupOutlined />,
        key: 'system/brokerages',
        description: 'Brokerages Management Description Here',
      },
      {
        path: 'entitlements',
        element: <Institution title="Institution" />,
        title: 'Entitlements',
        isCashInMainLayout: true,
        icon: <PlusCircleOutlined />,
        key: 'system/entitlements',
        description: 'Entitlements Management Description Here',
      },
      {
        path: 'institution',
        element: <Institution title="Institution" />,
        title: 'Institution',
        isCashInMainLayout: true,
        icon: <BankOutlined />,
        key: 'system/institution',
        description: 'Institution Management Description Here',
      },
      {
        path: 'audits',
        element: <Institution title="Institution" />,
        title: 'Audits',
        isCashInMainLayout: true,
        icon: <AlertOutlined />,
        key: 'system/audits',
      },
    ],
    key: 'system',
    icon: <SettingOutlined />,
  },
];
