import {
  Breadcrumb,
  Col,
  Divider,
  Empty,
  Flex,
  Input,
  InputRef,
  Modal,
  notification,
  Row,
  Space,
  Tooltip,
} from 'antd';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  CloseOutlined,
  HomeOutlined,
  SearchOutlined,
  StarOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import { getRoutePaths, PathItem } from 'src/utils/router';
import { routes } from 'src/routes';
import { useRouter } from 'src/hooks/use-router';
import { Utility } from 'src/utils/util';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectShowMenuSearch,
  toggleMenuSearch,
} from 'src/store/reducer/layout.slice';
import Highlighter from 'react-highlight-words';
import {
  addFavouritesTab,
  removeFromFavourites,
  selectFavouriteTabs,
} from 'src/store/reducer/settings.slice';
import { useRecentButtonClick } from 'src/hooks/use-recent-click';

import { AutoComplete } from 'antd';

export interface MenuSearchItem extends PathItem {
  children?: MenuSearchItem[];
}

type NestedRouteItem = MenuSearchItem & { children?: MenuSearchItem[] };

function MenuSearch() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState('');
  const routePaths = getRoutePaths(routes);
  const [currentRoutes, setCurrentRoutes] =
    React.useState<MenuSearchItem[]>(routePaths);
  const [routesMasterData, setRoutesMasterData] = React.useState<
    MenuSearchItem[]
  >([]);
  const [selectedMenu, setSelectedMenu] = React.useState<string>('All');
  const [breadCrumbArray, setBreadCrumbArray] = React.useState<
    { title: React.ReactNode; path?: string }[]
  >([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const searchInputRef = useRef<InputRef>(null);
  const isSearchModalOpen = useSelector(selectShowMenuSearch);
  const favouriteMenus = useSelector(selectFavouriteTabs);
  const { handleClick } = useRecentButtonClick();

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isSearchModalOpen) {
      dispatch(toggleMenuSearch());
    } else if (e.target.value.trim() === '') {
      dispatch(toggleMenuSearch());
    }
    setSearchTerm(e.target.value);
  };

  const prepareNestedRoutes = useCallback(
    (flatRoutes: MenuSearchItem[]): NestedRouteItem[] => {
      const excluded = ['login', '*', ''];
      const topLevel: NestedRouteItem[] = [];
      const routeMap: Record<string, NestedRouteItem> = {};

      flatRoutes.forEach((route) => {
        const segments = route.path.replace(/^\/+|\/+$/g, '').split('/');
        const firstSegment = segments[0];

        if (
          segments.length === 1 &&
          !excluded.includes(firstSegment.toLowerCase())
        ) {
          const parentPath = '/' + firstSegment;
          const parentRoute: NestedRouteItem = { ...route, children: [] };
          topLevel.push(parentRoute);
          routeMap[parentPath] = parentRoute;
        }
      });

      flatRoutes.forEach((route) => {
        const segments = route.path.replace(/^\/+|\/+$/g, '').split('/');
        const firstSegment = segments[0];

        if (
          segments.length > 1 &&
          !excluded.includes(firstSegment.toLowerCase())
        ) {
          const parentPath = '/' + firstSegment;
          const parent = routeMap[parentPath];

          if (parent) {
            parent.children!.push(route);
          }
        } else if (
          segments.length > 0 &&
          !excluded.includes(firstSegment.toLowerCase())
        ) {
          const parentPath = '/' + firstSegment;
          const parent = routeMap[parentPath];

          if (parent) {
            parent.children!.push(route);
          }
        }
      });

      return topLevel;
    },
    []
  );

  //new ........................................................................

  // Replace your existing filteredOptions useMemo with this:

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return [];

    const allItems: { item: MenuSearchItem; parentTitle: string }[] = [];

    const collectItems = (
      routes: MenuSearchItem[],
      parentTitle: string = ''
    ) => {
      routes.forEach((route) => {
        if (route.children && route.children.length > 0) {
          // For parent routes with children, collect children with parent context
          collectItems(route.children, route.title || '');
        } else {
          // Only collect leaf nodes (routes without children) with their parent title
          // Skip if parent title is same as item title to avoid duplicates like "system/system"
          if (route.title && route.path && route.title !== parentTitle) {
            allItems.push({ item: route, parentTitle });
          }
        }
      });
    };

    collectItems(currentRoutes);

    const filtered = allItems.filter(({ item, parentTitle }) => {
      const fullLabel = parentTitle
        ? `${item.title}/${parentTitle}`
        : parentTitle;
      const searchLower = searchTerm.toLowerCase();

      return fullLabel && fullLabel.toLowerCase().includes(searchLower);
    });

    return filtered.map(({ item, parentTitle }) => {
      // Build the display label with parent/child format
      const label = parentTitle ? `${item.title}/${parentTitle}` : parentTitle;

      return {
        value: item.path,
        label: label, // This will show "Trading/system" format
        path: item.path,
        title: item.title,
      };
    });
  }, [currentRoutes, searchTerm]);

  //const label = parentTitle ? `${item.title}/${parentTitle}` : parentTitle;
  const initiateMenuSearch = () => {
    const routes = prepareNestedRoutes(routePaths);
    const allRoute: MenuSearchItem = {
      title: 'All',
      path: '',
      icon: <UsergroupAddOutlined />,
      children: routes,
    };
    const masterData = [allRoute, ...routes];

    setRoutesMasterData(masterData);
    setCurrentRoutes(routes);
    setSelectedMenu('All');
    setSearchTerm('');

    setBreadCrumbArray([
      {
        title: (
          <span
            onClick={() => handleBreakcrumbClick('/')}
            style={{ cursor: 'pointer' }}
          >
            All
          </span>
        ),
      },
    ]);
  };

  const handleBreakcrumbClick = (path: string) => {
    // This section is left to add more functionalities to breadcrumb section
  };

  const selectMenuItem = (item: MenuSearchItem) => {
    setSelectedMenu(item.title || 'All');
    setSearchTerm('');

    if (item.title === 'All') {
      initiateMenuSearch();
    } else {
      setCurrentRoutes([item]);
      setBreadCrumbArray([
        {
          title: (
            <span
              onClick={() => handleBreakcrumbClick('/')}
              style={{ cursor: 'pointer' }}
            >
              {item.title}
            </span>
          ),
        },
      ]);
    }
  };

  const navigateToMenu = (item: MenuSearchItem) => {
    if (Utility.isDefined(item.path)) {
      router.push(item.path);
    }

    handleClick({
      path: item.path,
      title: item.title,
      isCash: item.isCashInMainLayout || false,
    });

    dispatch(toggleMenuSearch());
  };

  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedMenu !== 'All') {
      setSelectedMenu('All');
      setSearchTerm('');

      initiateMenuSearch();
    }

    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim() === '') {
      setBreadCrumbArray([
        {
          title: (
            <span
              onClick={() => handleBreakcrumbClick('/')}
              style={{ cursor: 'pointer' }}
            >
              All
            </span>
          ),
        },
      ]);
    } else {
      setBreadCrumbArray([
        {
          title: (
            <span
              onClick={() => handleBreakcrumbClick('/')}
              style={{ cursor: 'pointer' }}
            >
              All
            </span>
          ),
        },
        {
          title: 'Search Results',
        },
      ]);
    }
  };

  const addToFavourites = (item: MenuSearchItem) => {
    if (isFavouriteMenu(item)) {
      dispatch(
        removeFromFavourites({
          title: item.title || 'Untitled',
          path: item.path,
        })
      );
      notification.info({
        message: 'Removed from Favourites',
        description: `${item.title} menu has been removed from favourites`,
        placement: 'topRight',
      });
    } else {
      dispatch(
        addFavouritesTab({
          title: item.title || 'Untitled',
          path: item.path,
        })
      );
      notification.success({
        message: 'Added to Favourites',
        description: `${item.title} menu has been added to favourites`,
        placement: 'topRight',
      });
    }
  };

  const checkFilterMatch = (route: MenuSearchItem) => {
    return (
      !!route.isElementFound &&
      ((route.title?.toLowerCase().includes(searchTerm.toLowerCase()) ??
        false) ||
        (route.path?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false) ||
        (route.description?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false))
    );
  };

  useEffect(() => {
    initiateMenuSearch();
  }, []);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    } else {
      initiateMenuSearch();
    }
  }, [isSearchModalOpen]);

  const SearchItem: React.FC<{ item: MenuSearchItem }> = ({ item }) => (
    <Row key={item.title} className="cursor-pointer min-w-60 max-w-60">
      <Col
        span={21}
        className="py-2 px-3 border dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-l-xl rtl:rounded-l-none rtl:rounded-r-xl"
        onClick={() => navigateToMenu(item)}
      >
        <Title level={5} className="text-text-tertiary !mb-0 leading-3">
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchTerm]}
            autoEscape
            textToHighlight={item.title ? item.title.toString() : ''}
          />
        </Title>
        <Tooltip title={item.description} placement="bottom">
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchTerm]}
            autoEscape
            textToHighlight={
              item.description
                ? item.description.toString()
                : 'Description not found'
            }
            className="line-clamp-1"
          />
        </Tooltip>
      </Col>
      <Col
        onClick={() => addToFavourites(item)}
        span={3}
        className={`${isFavouriteMenu(item) ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-600 hover:bg-primary dark:hover:bg-primary-active hover:text-white border dark:border-slate-600'} transition duration-300 rounded-r-xl rtl:rounded-r-none rtl:rounded-l-xl flex justify-center items-center`}
      >
        <StarOutlined className="text-2xl" />
      </Col>
    </Row>
  );

  const isFavouriteMenu = (item: PathItem) => {
    return favouriteMenus.find((menu) => menu.path === item.path);
  };

  return (
    <div>
      <Input
        className="bg-white/50 text-primary border-none !shadow-none search-input"
        size={'small'}
        placeholder={t('labels.searchMenu')}
        value={searchTerm}
        onChange={onChangeText}
        onClick={() => dispatch(toggleMenuSearch())}
        prefix={<SearchOutlined className="text-primary mr-2" />}
      />
      <Modal
        open={isSearchModalOpen}
        onCancel={() => dispatch(toggleMenuSearch())}
        footer={null}
        width={'80%'}
        closable={false}
        styles={{
          body: {
            padding: 0,
            maxHeight: 'calc(100vh-100px)',
            height: 'calc(100vh-100px)',
          },
        }}
        className="menu-search-modal"
      >
        <Row className="w-full">
          <Col
            span={3}
            className="bg-bg-layout dark:bg-slate-950 border-r-2 rtl:border-l-0 rtl:rounded-r-xl rtl:rounded-l-none rounded-l-xl p-4 dark:border-slate-700"
          >
            <Title level={5} className="text-center text-text-tertiary">
              Menu Search
            </Title>
            <Space
              direction="vertical"
              className="w-full mt-4 h-full overflow-y-auto"
              style={{ maxHeight: '70vh' }}
            >
              {routesMasterData.map((route, index) => (
                <Space
                  onClick={() => selectMenuItem(route)}
                  key={index}
                  className={`${route.title === selectedMenu ? 'bg-primary text-white' : 'hover:bg-primary '} w-full cursor-pointer transition duration-300 rounded-lg px-2 py-1 hover:text-white`}
                >
                  <Space
                    className={`${route.title === selectedMenu && '!text-white'}  text-lg`}
                  >
                    {route.icon || (
                      <HomeOutlined className="text-primary hover:text-white" />
                    )}
                  </Space>
                  <Text
                    className={`${route.title === selectedMenu && 'text-white'} text-inherit`}
                  >
                    {route.title}
                  </Text>
                </Space>
              ))}
            </Space>
          </Col>
          <Col span={21}>
            <Flex className="border-b-2 dark:border-slate-700 py-2 px-4 justify-between items-center">
              <Breadcrumb separator=">" items={breadCrumbArray} />
              <Space size={'large'}>
                {isSearchModalOpen && (
                  <AutoComplete
                    style={{ width: '100%' }}
                    options={filteredOptions}
                    value={searchTerm}
                    onChange={(value) => setSearchTerm(value)}
                    onSelect={(value, option) => {
                      if (option && option.path) {
                        navigateToMenu({
                          title: option.title!,
                          path: option.path,
                        });
                      }
                    }}
                  >
                    <Input
                      ref={searchInputRef}
                      size={'small'}
                      placeholder={t('labels.searchMenu')}
                      prefix={
                        <SearchOutlined className="text-text-tertiary mr-2" />
                      }
                      className="!shadow-none hover:border-primary"
                      autoFocus
                    />
                  </AutoComplete>
                )}

                <CloseOutlined
                  className="cursor-pointer text-lg hover:text-red-800"
                  onClick={() => dispatch(toggleMenuSearch())}
                />
              </Space>
            </Flex>

            <RenderSearchResults
              currentRoutes={currentRoutes}
              checkFilterMatch={checkFilterMatch}
              SearchItem={SearchItem}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

const RenderSearchResults: React.FC<{
  currentRoutes: MenuSearchItem[];
  checkFilterMatch: (route: MenuSearchItem) => boolean;
  SearchItem: React.FC<{ item: MenuSearchItem }>;
}> = React.memo(({ currentRoutes, checkFilterMatch, SearchItem }) => {
  const processedRoutes = useMemo(() => {
    return currentRoutes
      .map((route) => {
        const filteredChildren =
          route.children?.filter((child) => checkFilterMatch(child)) || [];
        return { route, filteredChildren };
      })
      .sort((a, b) => b.filteredChildren.length - a.filteredChildren.length);
  }, [currentRoutes, checkFilterMatch]);

  const hasAnyMatch = useMemo(() => {
    return processedRoutes.some((r) => r.filteredChildren.length > 0);
  }, [processedRoutes]);

  return (
    <div
      className="px-6 pt-6 overflow-y-scroll"
      style={{ maxHeight: '75vh', height: '75vh' }}
    >
      {hasAnyMatch ? (
        processedRoutes.map(({ route, filteredChildren }) => {
          if (filteredChildren.length === 0) return null;

          return (
            <Flex
              key={route.path}
              wrap
              gap={12}
              className="w-full"
              vertical
              rootClassName="pb-4"
            >
              {currentRoutes.length > 1 && filteredChildren.length > 0 && (
                <Divider
                  style={{
                    margin: 0,
                    color: '#aaaaaa',
                    paddingBottom: 4,
                    fontSize: 13,
                  }}
                >
                  {route.title}
                </Divider>
              )}

              <Flex wrap gap={12}>
                {filteredChildren.map((child) => (
                  <SearchItem key={child.path} item={child} />
                ))}
              </Flex>
            </Flex>
          );
        })
      ) : (
        <div className="flex items-center justify-center h-full">
          <Empty description="No matches found for your search" />
        </div>
      )}
    </div>
  );
});

export default MenuSearch;
