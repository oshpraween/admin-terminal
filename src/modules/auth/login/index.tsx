import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from 'src/store/rootReducer';
import Loader from 'src/components/shared-components/Loader';
import { onStartLoading, onStopLoading } from 'src/store/reducer/loader.slice';
import { login } from 'src/store/reducer/modules/auth/auth.action';
import { AuthRequest } from 'src/messages/oms/auth-request';
import { EncryptionUtil } from 'src/utils/encryptionUtil';
import { Settings } from 'src/settings/settings';
import { Form, Input, Alert, Typography, Segmented } from 'antd';
import { UserOutlined, LockOutlined, SettingOutlined } from '@ant-design/icons';
import Button from 'src/components/shared-components/Button';
import { setLanguage, selectLanguage } from 'src/store/reducer/settings.slice';
import { useTranslation } from 'react-i18next';

import bgImage from 'src/assets/login/background-min.png';
import screenWarningImg from 'src/assets/login/screen-warning.svg';
import img1 from 'src/assets/login/1.png';
import img2 from 'src/assets/login/2.png';
import img3 from 'src/assets/login/3.png';
import img4 from 'src/assets/login/4.png';
import img5 from 'src/assets/login/5.png';
import img6 from 'src/assets/login/6.png';
import img7 from 'src/assets/login/7.png';
import img8 from 'src/assets/login/8.png';
import img9 from 'src/assets/login/9.png';
import img10 from 'src/assets/login/10.png';
import img11 from 'src/assets/login/11.png';
import img12 from 'src/assets/login/12.png';
import img13 from 'src/assets/login/13.png';
import img14 from 'src/assets/login/14.png';
import img15 from 'src/assets/login/15.png';
import img16 from 'src/assets/login/16.png';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { connected, connecting, loginLoading, loginError } = useSelector(
    (state: RootState) => state.oms
  );
  const { error, loading, loginFullFilled, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const headings = ['welcomeMsg1', 'welcomeMsg2', 'welcomeMsg3', 'welcomeMsg4'];

  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [headingText, setHeadingText] = useState('');

  const loginErrorMsg = useMemo(() => {
    if (connected) {
      if (loginFullFilled) {
        if (error) {
          return error;
        }
        return null;
      }
      return null;
    }
    return loginError;
  }, [loginFullFilled, error, connected, loginError]);

  const handleFinish = (values: { username: string; password: string }) => {
    if (loginLoading || connecting || !connected) {
      console.warn('Blocked login: not ready');
      return;
    }

    const { username, password } = values;
    const ePwd = EncryptionUtil.rsaEncryptWitBase64Encode();
    const pwd = EncryptionUtil.getHashMessage(
      password,
      Settings.hashMethod,
      username
    );
    const user = new AuthRequest(username, ePwd, pwd ?? '');

    dispatch(login(user));
  };

  const getShuffledImages = (): string[] => {
    const images = [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
      img12,
      img13,
      img14,
      img15,
      img16,
    ];

    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }

    return images;
  };

  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);

  const disabled = useMemo(() => {
    return !(connected && !loading && !connecting);
  }, [connected, connecting, loading]);

  const language = useSelector(selectLanguage);
  const { t } = useTranslation();

  const changeLanguage = (language: 'en' | 'ar') => {
    dispatch(setLanguage(language));
  };

  useEffect(() => {
    if (disabled) {
      dispatch(onStartLoading());
    } else {
      dispatch(onStopLoading());
    }
  }, [connected, connecting, disabled, dispatch]);

  useEffect(() => {
    if (loginFullFilled && !error && isAuthenticated) {
      dispatch(onStopLoading());
      navigate('/');
    }
  }, [loginFullFilled, error, isAuthenticated, dispatch, navigate]);

  useEffect(() => {
    // Randomize heading
    setHeadingText(headings[Math.floor(Math.random() * headings.length)]);

    // Randomize image layout
    setShuffledImages(getShuffledImages());
  }, []);

  useEffect(() => {
    const checkResolution = () => {
      const minWidth = 1024;
      const minHeight = 720;
      setIsScreenTooSmall(
        window.innerWidth < minWidth || window.innerHeight < minHeight
      );
    };

    checkResolution();
    window.addEventListener('resize', checkResolution);
    return () => window.removeEventListener('resize', checkResolution);
  }, []);

  return (
    <>
      <Loader />
      <div className="relative min-h-screen bg-white overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '30%',
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        />

        {/* Top bar: Logo + Language/Settings */}
        <div className="absolute top-6 z-10 w-full px-6 flex justify-between items-center text-sm">
          <Typography.Title
            level={2}
            className="!text-blue-700 !m-0 !leading-none font-bold"
          >
            FINEXA
          </Typography.Title>

          <div className="flex items-center gap-4">
            <Segmented
              options={[
                { label: 'EN', value: 'en' },
                { label: 'AR', value: 'ar' },
              ]}
              value={language}
              onChange={(val) => changeLanguage(val as 'en' | 'ar')}
              size="small"
              className="!text-xs !font-medium !bg-gray-200 dark:!bg-gray-200 !text-black dark:!text-black"
              style={{ background: '#D8D8D8' }}
            />
            <SettingOutlined className="text-lg cursor-pointer text-gray-600 hover:text-blue-600" />
          </div>
        </div>

        {/* Content Wrapper */}
        <div
          className="relative z-10 w-[40rem] mx-auto"
          style={{ marginTop: '17vh' }}
        >
          <div className="text-center mb-8">
            <Title
              level={2}
              className="!mb-1 !text-gray-500 dark:!text-gray-500"
            >
              {t(`messages.${headingText}`)}
            </Title>
            <Text className="text-base text-gray-600">
              {t('messages.welcomeMsgSub')}
            </Text>
          </div>

          <div className="flex w-[40rem] h-[24rem] rounded-[20px] overflow-hidden shadow-lg border border-gray-300">
            {/* Image Grid */}
            <div className="w-[24rem] grid grid-cols-4 grid-rows-4">
              {shuffledImages.map((src, idx) => (
                <div key={idx} className="w-24 h-24">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Login Form */}
            <div className="w-[16rem] px-8 py-4 bg-white flex flex-col justify-between border-l border-gray-300">
              <div>
                <div className="font-semibold text-base mb-1 text-center">
                  {t('labels.productName')}
                </div>
                <div className="text-xxs text-gray-400 mb-8 text-center">
                  V.1.000.00.01
                </div>

                <Form
                  layout="vertical"
                  className="pt-8"
                  onFinish={handleFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    name="username"
                    className="mb-4"
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder={t('labels.username')}
                      prefix={<UserOutlined className="text-gray-400" />}
                      autoComplete="off"
                      className="!bg-white !text-black !border-gray-300 dark:!bg-white dark:!text-black dark:!border-gray-300"
                    />
                  </Form.Item>

                  <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password
                      placeholder={t('labels.password')}
                      prefix={<LockOutlined className="text-gray-400" />}
                      visibilityToggle
                      autoComplete="new-password"
                      className="!bg-white !text-black !border-gray-300 dark:!bg-white dark:!text-black dark:!border-gray-300"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      label={t('labels.login')}
                      type="primary"
                      btnSubmitType="submit"
                      loading={loginLoading}
                      isDisabled={loginLoading || disabled}
                      baseMarginNeeded={false}
                      aria-label="Login Button"
                      buttonStyle="bg-blue-600 hover:bg-blue-700"
                    />
                  </Form.Item>

                  {loginErrorMsg && (
                    <Alert
                      message={loginErrorMsg}
                      type="error"
                      showIcon
                      style={{ marginBottom: 16 }}
                    />
                  )}
                </Form>
              </div>

              <Text
                type="secondary"
                className="text-xxs text-center text-gray-500 leading-tight block mt-2"
              >
                {t('messages.loginDisclamer')}
              </Text>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute text-center bottom-4 w-full text-gray-500 text-[10px] z-10">
          © {new Date().getFullYear()} {t('messages.copyright')}
        </footer>
      </div>

      {isScreenTooSmall && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center text-center px-6">
          <img
            src={screenWarningImg}
            alt="Display warning"
            className="w-[144px] h-[144px] mb-6"
          />
          <h1 className="text-[25px] font-semibold text-blue-600 mb-2">
            Display Too Small
          </h1>
          <p className="text-gray-600 text-[15px] max-w-md">
            For the best experience, please use a device with a larger screen.
            <br className="hidden sm:block" />
            This layout is optimized for desktop or tablet viewports.
          </p>
        </div>
      )}
    </>
  );
};

export default Login;
