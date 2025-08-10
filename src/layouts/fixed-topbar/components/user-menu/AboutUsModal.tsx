import React from 'react';
import { useEffect, useState } from 'react';
import { Modal, Typography, Divider, Space } from 'antd';
import {
  MailOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  RocketTwoTone,
  BankTwoTone,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title, Text, Link } = Typography;

interface AboutUsModalProps {
  open: boolean;
  onClose: () => void;
}

const AboutUsModal: React.FC<AboutUsModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  const useAppVersion = () => {
    const [version, setVersion] = useState<string | null>(null);
    const [buildDate, setBuildDate] = useState<string | null>(null);

    useEffect(() => {
      fetch('/version.json')
        .then((res) => res.json())
        .then((data) => {
          setVersion(data.version);
          setBuildDate(data.buildDate);
        })
        .catch(() => {
          setVersion('unknown');
          setBuildDate(null);
        });
    }, []);

    return { version, buildDate };
  };

  const { version, buildDate } = useAppVersion();

  return (
    <Modal
      title="About Us"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
    >
      <div>
        <Divider />
        <Title level={4} style={{ marginBottom: 0 }}>
          FinexaTech - {t('labels.productName')}
        </Title>
        <Text type="secondary">
          Version: {version || 'Unavailable'}
          {buildDate ? `  |  Build Date: ${buildDate}` : ''}
        </Text>
        {!version && (
          <Text disabled className="mt-2 block">
            ⚠️ We couldn’t fetch version information. The application remains
            fully functional.
          </Text>
        )}
        <Divider>
          <Text>FinexaTech Products</Text>
        </Divider>
        <Space direction="vertical" size="small">
          <Space>
            <RocketTwoTone
              twoToneColor="#eb2f96"
              style={{ fontSize: '24px' }}
            />
            <Text strong>AMS</Text>
            <Text disabled>– Finexa Asset Management System</Text>
          </Space>
          <Space>
            <BankTwoTone twoToneColor="#52c41a" style={{ fontSize: '24px' }} />
            <Text strong>CMS</Text>
            <Text disabled>– Finexa Customer Relationship Management</Text>
          </Space>
        </Space>

        <Divider />

        <Title level={5}>Contact Us</Title>
        <Space direction="vertical">
          <Space>
            <MailOutlined />{' '}
            <Link href="mailto:support@finexatech.com">
              support@finexatech.com
            </Link>
          </Space>
          <Space>
            <GlobalOutlined />{' '}
            <Link href="https://www.finexatech.com" target="_blank">
              www.finexatech.com
            </Link>
          </Space>
          <Space>
            <EnvironmentOutlined /> <Text>KSA, UAE, Sri Lanka</Text>
          </Space>
        </Space>
      </div>
    </Modal>
  );
};

export default AboutUsModal;
