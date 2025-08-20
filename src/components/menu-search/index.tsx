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

  // Function that flattens to simplify searching
  const flattenRoutesForSearch = useCallback(
    (routes: MenuSearchItem[]): MenuSearchItem[] => {
      const uniqueRoutes = new Map<string, MenuSearchItem>();
      const excluded = ['login', '*', ''];

      const flatten = (routeList: MenuSearchItem[]) => {
        routeList.forEach((route) => {
          // Only add routes with valid path and title, avoid duplicates and excluded routes
          if (
            route.path &&
            route.title &&
            route.path !== '' &&
            route.title !== '' &&
            !excluded.some((exc) =>
              route.path.toLowerCase().includes(exc.toLowerCase())
            )
          ) {
            const key = `${route.path}-${route.title}`;
            if (!uniqueRoutes.has(key)) {
              uniqueRoutes.set(key, route);
            }
          }

          // Recursively process children
          if (route.children && route.children.length > 0) {
            flatten(route.children);
          }
        });
      };

      flatten(routes);
      return Array.from(uniqueRoutes.values());
    },
    []
  );

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

  // Fixed AutoComplete options with better filtering and validation
  const autoCompleteOptions = useMemo(() => {
    if (!searchTerm || searchTerm.trim().length === 0) return [];

    const searchTermLower = searchTerm.toLowerCase().trim();

    // Get all routes from master data, excluding the "All" option
    const allRoutes = routesMasterData
      .filter((route) => route.title !== 'All') // Exclude the "All" option
      .flatMap((route) => {
        const routes: MenuSearchItem[] = [];

        // Only add parent routes if they don't have children (i.e., they are actual navigable routes)
        if (
          route.path &&
          route.title &&
          route.path !== '' &&
          (!route.children || route.children.length === 0)
        ) {
          routes.push(route);
        }

        // Add all children (these are the actual navigable pages)
        if (route.children) {
          routes.push(
            ...route.children.filter(
              (child) => child.path && child.title && child.path !== ''
            )
          );
        }

        return routes;
      });

    // Enhanced filtering with better validation
    const seenRoutes = new Set<string>();
    const filteredRoutes = allRoutes.filter((route) => {
      // Skip invalid routes
      if (
        !route.path ||
        !route.title ||
        route.path === '' ||
        route.title === ''
      ) {
        return false;
      }

      // Create unique key
      const routeKey = `${route.path}-${route.title}`;

      // Skip duplicates
      if (seenRoutes.has(routeKey)) {
        return false;
      }

      // Check if route matches search term - ONLY match against title
      const titleMatch = route.title.toLowerCase().includes(searchTermLower);

      const isMatch = titleMatch;

      if (isMatch) {
        seenRoutes.add(routeKey);
        return true;
      }

      return false;
    });

    // Sort results by relevance (exact title matches first, then starts with, then contains)
    const sortedRoutes = filteredRoutes.sort((a, b) => {
      const aTitle = (a.title || '').toLowerCase();
      const bTitle = (b.title || '').toLowerCase();

      const aExactMatch = aTitle === searchTermLower;
      const bExactMatch = bTitle === searchTermLower;

      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;

      const aStartsWithMatch = aTitle.startsWith(searchTermLower);
      const bStartsWithMatch = bTitle.startsWith(searchTermLower);

      if (aStartsWithMatch && !bStartsWithMatch) return -1;
      if (!aStartsWithMatch && bStartsWithMatch) return 1;

      return aTitle.localeCompare(bTitle);
    });

    // Limit results to prevent performance issues
    const limitedResults = sortedRoutes.slice(0, 10);

    return limitedResults.map((route, index) => ({
      value: route.title || `route-${index}`,
      key: `${route.path}-${route.title}-${index}`,
      routeItem: route,
      label: (
        <div
          style={{
            padding: '8px 12px',
            borderBottom:
              index < limitedResults.length - 1 ? '1px solid #f0f0f0' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#262626',
            }}
          >
            {route.title}
          </div>
          <div
            style={{
              fontSize: '11px',
              color: '#999999',
              fontFamily: 'monospace',
              fontWeight: '400',
              backgroundColor: '#f5f5f5',
              padding: '2px 6px',
              borderRadius: '3px',
            }}
          >
            {(() => {
              // Extract main route path (first segment only)
              const pathSegments = route.path
                .split('/')
                .filter((segment) => segment !== '');
              return pathSegments.length > 0
                ? `/${pathSegments[0]}`
                : route.path;
            })()}
          </div>
        </div>
      ),
    }));
  }, [searchTerm, routesMasterData]);

  const onChangeSearchText = (value: string) => {
    if (selectedMenu !== 'All') {
      setSelectedMenu('All');
      initiateMenuSearch();
    }

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
      setCurrentRoutes(prepareNestedRoutes(routePaths));
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

      // Filter routes based on search term with better validation
      const searchTermLower = value.toLowerCase().trim();
      const allRoutes = flattenRoutesForSearch(routesMasterData);
      const filteredRoutes = allRoutes.filter(
        (route) =>
          route.title &&
          route.path && // Ensure valid routes
          (route.title.toLowerCase().includes(searchTermLower) ||
            route.path.toLowerCase().includes(searchTermLower) ||
            (route.description &&
              route.description.toLowerCase().includes(searchTermLower)))
      );

      // Group filtered routes back into nested structure
      const groupedResults = prepareNestedRoutes(filteredRoutes);
      setCurrentRoutes(groupedResults);
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

  const checkFilterMatch = (route: MenuSearchItem): boolean => {
    if (!searchTerm || searchTerm.trim() === '') {
      return true; // Show all items when no search term
    }

    // Ensure route has valid properties before checking
    if (!route.title || !route.path) {
      return false;
    }

    const searchTermLower = searchTerm.toLowerCase().trim();
    return (
      route.title.toLowerCase().includes(searchTermLower) ||
      route.path.toLowerCase().includes(searchTermLower) ||
      (route.description
        ? route.description.toLowerCase().includes(searchTermLower)
        : false)
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
          {item.title ? item.title.toString() : ''}
        </Title>
        <Tooltip title={item.description} placement="bottom">
          <div className="line-clamp-1">
            {item.description
              ? item.description.toString()
              : 'Description not found'}
          </div>
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

  const clearSearch = () => {
    setSearchTerm('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
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
            <Flex className="border-b-2 dark:border-slate-700 py-3 px-4 justify-between items-center">
              <Breadcrumb separator=">" items={breadCrumbArray} />

              <div className="flex items-center gap-4">
                {isSearchModalOpen && (
                  <AutoComplete
                    style={{
                      width: '400px',
                      minWidth: '300px',
                    }}
                    options={autoCompleteOptions}
                    value={searchTerm}
                    onSearch={onChangeSearchText}
                    onSelect={(value, option) => {
                      const item = (option as any).routeItem as MenuSearchItem;
                      if (item && item.path && item.title) {
                        navigateToMenu(item);
                      }
                    }}
                    allowClear={true}
                    showSearch
                    filterOption={false}
                    notFoundContent={
                      searchTerm &&
                      searchTerm.trim().length > 0 &&
                      autoCompleteOptions.length === 0 ? (
                        <div
                          style={{
                            padding: '12px',
                            textAlign: 'center',
                            color: '#bfbfbf',
                          }}
                        >
                          <SearchOutlined style={{ marginRight: '8px' }} />
                          No results found for "{searchTerm}"
                        </div>
                      ) : null
                    }
                    placeholder="Search Menu"
                    dropdownStyle={{
                      maxHeight: '400px',
                      overflow: 'auto',
                      boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08)',
                      borderRadius: '6px',
                    }}
                  >
                    <Input
                      ref={searchInputRef}
                      prefix={
                        <SearchOutlined
                          style={{
                            marginRight: '8px',
                            color: '#8c8c8c',
                            fontSize: '14px',
                          }}
                        />
                      }
                      size="middle"
                      autoFocus
                      style={{
                        borderRadius: '6px',
                        border: '1px solid #d9d9d9',
                        transition: 'all 0.3s',
                        height: '32px',
                      }}
                    />
                  </AutoComplete>
                )}

                <CloseOutlined
                  className="cursor-pointer text-gray-600 hover:text-red-600 transition-colors duration-200"
                  style={{
                    fontSize: '16px',
                    padding: '4px',
                  }}
                  onClick={() => dispatch(toggleMenuSearch())}
                />
              </div>
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
