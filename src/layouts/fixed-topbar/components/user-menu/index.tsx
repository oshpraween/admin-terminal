import React, { ReactNode, useContext, useState } from 'react';
import {
  DownOutlined,
  BgColorsOutlined,
  UserOutlined,
  WifiOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  BankOutlined,
  FolderOutlined,
  CheckOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import { Space, Avatar, Popover, Divider, Flex, Badge } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import { ThemeContext } from 'src/theme/theme-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeAllRecentTabs,
  selectShowSideBar,
  toggleSideBar,
} from 'src/store/reducer/layout.slice';
import { useAliveController } from 'react-activation';
import { logout } from 'src/store/reducer/modules/auth/auth.action';
import { useTranslation } from 'react-i18next';
import {
  setLanguage,
  selectLanguage,
  selectThemeVariant,
} from 'src/store/reducer/settings.slice';
// @ts-ignore
import LightThemeSvg from 'src/assets/svg/light-theme-icon.svg?react';
// @ts-ignore
import DarkThemeSvg from 'src/assets/svg/dark-theme-icon.svg?react';
import { lightThemeVariations } from 'src/theme/light-theme-variations';
import AboutUsModal from './AboutUsModal';

type MenuItemProps = {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  popoverContent?: ReactNode;
};

const MenuItem = ({ icon, label, onClick, popoverContent }: MenuItemProps) => {
  const language = useSelector(selectLanguage);
  const isArabic = language === 'ar';

  const content = (
    <Space
      onClick={onClick}
      className="cursor-pointer rounded-lg text-lg px-2 py-0.5 w-full hover:bg-secondary-hover transition duration-300"
    >
      {icon}
      <Text className="text-inherit">{label}</Text>
    </Space>
  );

  if (popoverContent) {
    return (
      <Popover
        className="cursor-pointer w-44"
        trigger="click"
        arrow={false}
        placement="left"
        content={popoverContent}
        styles={{
          body: isArabic
            ? { marginLeft: '30px', marginTop: '40px' }
            : { marginRight: '30px', marginTop: '40px' },
        }}
      >
        {content}
      </Popover>
    );
  }

  return content;
};

const ThemeContent = () => {
  const { theme, toggleTheme, setThemeColor } = useContext(ThemeContext);
  const { t } = useTranslation();
  const themeVariant = useSelector(selectThemeVariant);

  return (
    <Space direction="vertical" className="p-2">
      <Title level={4}>{t('labels.themes')}</Title>
      <Text className="text-text-tertiary text-lg">
        {t('labels.appearance')}
      </Text>

      <Space size={'large'}>
        <Space
          direction="vertical"
          className="cursor-pointer"
          onClick={() => toggleTheme()}
        >
          <Space
            className={`text-5xl p-1 rounded-xl ${theme === 'light' && 'border-2 border-blue-700'}`}
          >
            <LightThemeSvg />
          </Space>
          <Space direction="vertical" className="text-text-tertiary">
            {t('labels.light')}
          </Space>
        </Space>
        <Space
          direction="vertical"
          className="cursor-pointer"
          onClick={() => toggleTheme()}
        >
          <Space
            className={`text-5xl p-1 rounded-xl ${theme === 'dark' && 'border-2 border-blue-700'}`}
          >
            <DarkThemeSvg />
          </Space>

          <Space direction="vertical" className="text-text-tertiary">
            {t('labels.dark')}
          </Space>
        </Space>
      </Space>

      {theme === 'light' && (
        <>
          <Divider className="my-1" />
          <Text className="text-text-tertiary text-lg">
            {t('labels.themes')}
          </Text>
          <Space className="pt-2">
            {lightThemeVariations.map((color) => (
              <Space
                className="border rounded-lg cursor-pointer"
                onClick={() => setThemeColor(color.id)}
              >
                {color.id === themeVariant ? (
                  <Flex
                    align="center"
                    justify="center"
                    className="m-1.5 w-30 h-30 rounded-lg bg-primary"
                  >
                    <CheckOutlined className="text-white text-lg" />
                  </Flex>
                ) : (
                  <div
                    className="m-1.5 w-30 h-30 rounded-lg"
                    style={{ backgroundColor: color.colors[0].hex }}
                  />
                )}
              </Space>
            ))}
          </Space>
        </>
      )}
    </Space>
  );
};

const UserMenuModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dropScope } = useAliveController();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const sidebarVisible = useSelector(selectShowSideBar);
  const isArabic = language === 'ar';

  const handleLogout = () => {
    dispatch(removeAllRecentTabs());
    dropScope('__root_cache__');
    dispatch(logout());
  };

  const handleLanguageToggle = () => {
    const nextLang = language === 'en' ? 'ar' : 'en';
    dispatch(setLanguage(nextLang));
    setIsOpen(false);
  };

  const [open, setOpen] = useState(false);

  const toggleSideBarFn = () => {
    dispatch(toggleSideBar());
    setIsOpen(false);
  };

  const [openAboutUsModal, setOpenAboutUsModal] = useState(false); // for Modal

  const openAboutUsModalFn = () => {
    setOpenAboutUsModal(true);
    setIsOpen(false); // optional: closes user menu when modal opens
  };

  const MenuContent = () => {
    return (
      <Space direction="vertical" className="w-60">
        <Space>
          <Badge dot status={'success'} offset={[isArabic ? 3 : -4, 25]}>
            <Avatar size={'small'} className="bg-primary">
              AM
            </Avatar>
          </Badge>
          <Space direction="vertical" size={0}>
            <Text>Ahamad Murshide</Text>
            <Text className={'text-secondary-text'}>Online</Text>
          </Space>
        </Space>

        <Space direction="vertical" className="pt-3 w-full gap-1">
          <MenuItem icon={<FolderOutlined />} label={t('labels.general')} />
          <MenuItem
            icon={<BgColorsOutlined />}
            label={t('labels.theme')}
            popoverContent={<ThemeContent />}
          />
          <MenuItem icon={<UserOutlined />} label={t('labels.user')} />
          <Divider className="my-1 border-secondary-border" />
          <MenuItem
            icon={<WifiOutlined />}
            label={t('labels.connectionSettings')}
          />
          <MenuItem icon={<BankOutlined />} label={t('labels.institution')} />
          <MenuItem icon={<DeleteOutlined />} label={t('labels.cacheClear')} />
          <MenuItem
            icon={<InfoCircleOutlined />}
            label={t('labels.aboutUs')}
            onClick={openAboutUsModalFn}
          />
          <MenuItem
            icon={
              language === 'en' ? (
                <span role="img" aria-label="Arabic flag">
                  🇸🇦
                </span>
              ) : (
                <span role="img" aria-label="English flag">
                  🇬🇧
                </span>
              )
            }
            label={t('labels.languageModeText')}
            onClick={handleLanguageToggle}
          />
          <Divider className="my-1 border-secondary-border" />
          <MenuItem
            icon={sidebarVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            label={
              sidebarVisible ? t('labels.hideSidebar') : t('labels.showSidebar')
            }
            onClick={toggleSideBarFn}
          />
          <Divider className="my-1 border-secondary-border" />
          <MenuItem
            icon={<LogoutOutlined />}
            label={t('labels.logout')}
            onClick={handleLogout}
          />
        </Space>
      </Space>
    );
  };

  return (
    <>
      <Popover
        trigger={'click'}
        placement="bottomRight"
        arrow={false}
        content={MenuContent}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <Space className="bg-white/50 rounded-3xl px-1.5 py-1 cursor-pointer">
          <Avatar size={20} className="bg-primary !text-sm" gap={10}>
            A
          </Avatar>
          <DownOutlined className="text-white text-xs" />
        </Space>
      </Popover>
      <AboutUsModal
        open={openAboutUsModal}
        onClose={() => setOpenAboutUsModal(false)}
      />
    </>
  );
};

export default UserMenuModal;
