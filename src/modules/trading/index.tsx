import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Button,
  ConfigProvider,
  Input,
  InputRef,
  Popover,
  Space,
  Table,
  TableColumnType,
} from 'antd';
import type { TableProps } from 'antd';
import { ContextMenuPopover } from 'src/modules/trading/components/ContextMenuPopover';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

interface RecordType {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address1: string;
  address2: string;
  address3: string;
  group: string;
}

type DataIndex = keyof RecordType;

interface PopoverState {
  visible: boolean;
  x: number;
  y: number;
  content: React.ReactNode;
}

const renderIdColumn = (text: string) => (
  <span className="text-xs">{text}</span>
);

// Fixed columns with correct typing
const fixedColumns: TableProps<RecordType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 120,
    sorter: (a, b) => String(a.id).localeCompare(String(b.id)),
    showSorterTooltip: false,
  },
  {
    title: 'FirstName', // Fix typo
    dataIndex: 'firstName',
    width: 170,
    sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    showSorterTooltip: false,
  },
  {
    title: 'LastName',
    dataIndex: 'lastName',
    width: 170,
    sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    showSorterTooltip: false,
  },
  {
    title: 'Group',
    dataIndex: 'group',
    width: 170,
    sorter: (a, b) => a.group.localeCompare(b.group),
    showSorterTooltip: false,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 140,
    sorter: (a, b) => a.age - b.age,
    showSorterTooltip: false,
  },
  {
    title: 'Address 1',
    dataIndex: 'address1',
    sorter: (a, b) => a.address1.localeCompare(b.address1),
    showSorterTooltip: false,
  },
  {
    title: 'Address 2',
    dataIndex: 'address2',
    sorter: (a, b) => a.address2.localeCompare(b.address2),
    showSorterTooltip: false,
  },
  {
    title: 'Address 3',
    dataIndex: 'address3',
    sorter: (a, b) => a.address3.localeCompare(b.address3),
    showSorterTooltip: false,
  },
];

const getData = (length: number): RecordType[] =>
  Array.from({ length }).map<RecordType>((_, index) => ({
    id: index,
    firstName: `First_${index.toString(16)}`,
    lastName: `Last_${index.toString(16)}`,
    age: 25 + (index % 10),
    address1: `New York No. ${index} Lake Park`,
    address2: `London No. ${index} Lake Park`,
    address3: `Sydney No. ${index} Lake Park`,
    group: `Group ${Math.floor(index / 4)}`,
  }));

const Trading: React.FC = () => {
  const data = React.useMemo<RecordType[]>(() => getData(1000), []);

  const [searchText, setSearchText] = useState('');
  const [changeTableData, setChangeTableData] = useState(false);
  const [searchedColumn, setSearchedColumn] = useState('');
  const [footerContent, setFooterContent] = useState<React.ReactNode>(null);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<RecordType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div className="rounded-lg p-2" onKeyDown={(e) => e.stopPropagation()}>
        <Input
          size="small"
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          className="text-xs"
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        renderIdColumn(text)
      ),
  });

  const [popover, setPopover] = useState<PopoverState>({
    visible: false,
    x: 0,
    y: 0,
    content: null,
  });

  // Memoize the handler to avoid stale closure in useMemo
  const handleRightClick = useCallback(
    (
      event: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
      record: RecordType,
      rowIndex: number,
      columnKey: keyof RecordType
    ) => {
      event.preventDefault();
      setPopover({
        visible: true,
        x: event.clientX,
        y: event.clientY,
        content: (
          <div>
            <strong>Cell:</strong> {columnKey}
            <br />
            <strong>Value:</strong> {record[columnKey]}
          </div>
        ),
      });
    },
    []
  );

  const handleClose = useCallback(() => {
    setPopover((prev) => ({ ...prev, visible: false }));
  }, []);

  // Attach ref to a div, not Flex (which is a function component)
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const [yAxis, setYAxis] = useState(0);

  useEffect(() => {
    if (tableContainerRef.current) {
      const computedStyle = window.getComputedStyle(tableContainerRef.current);
      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);
      const marginTop = parseFloat(computedStyle.marginTop);
      const marginBottom = parseFloat(computedStyle.marginBottom);

      const contentHeight =
        tableContainerRef.current.offsetHeight -
        paddingTop -
        paddingBottom -
        marginTop -
        marginBottom;

      setYAxis(contentHeight - 72);
    }
  }, []);

  // Add right-click handler to each cell in columns
  const mergedColumns = React.useMemo<TableProps<RecordType>['columns']>(() => {
    return fixedColumns.map((col) => {
      if ('dataIndex' in col && col.dataIndex) {
        return {
          ...col,
          onCell: (record: RecordType, rowIndex?: number) => ({
            onContextMenu: (event: React.MouseEvent<HTMLTableCellElement>) => {
              handleRightClick(
                event,
                record,
                rowIndex ?? 0,
                col.dataIndex as keyof RecordType
              );
            },
            style: { cursor: 'context-menu' },
          }),
          ...getColumnSearchProps(col.dataIndex as keyof RecordType),
        };
      }
      return col;
    });
  }, [handleRightClick, handleSearch]);

  useEffect(() => {
    if (tableContainerRef.current) {
      const tableContainer = tableContainerRef.current.querySelector(
        '.ant-table-container'
      ) as HTMLDivElement | null;
      if (tableContainer) {
        console.log(
          'tableContainer.offsetHeight: ',
          tableContainer.offsetHeight
        );
        console.log('yAxis: ', yAxis);
        if (tableContainer.offsetHeight < yAxis) {
          setFooterContent(
            <div
              style={{
                height: yAxis - tableContainer.offsetHeight + 31,
              }}
            >
              {' '}
            </div>
          );
        } else {
          setFooterContent(null);
        }
      }
    }
  }, [yAxis, changeTableData]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: 'rgb(224,223,223)',
            fontWeightStrong: 700,
            borderRadius: 0,
            borderRadiusLG: 0,
            fontSize: 13,
            cellPaddingInlineSM: 15,
            cellPaddingBlockSM: 5,
            rowHoverBg: '#C9D4FF',
            colorTextHeading: '#535353',
            borderColor: 'rgba(255,255,255,0)',
          },
          Pagination: {
            controlHeightSM: 20,
            fontSizeSM: 12,
            fontSize: 12,
            marginXXS: 10,
            marginXS: 10,
            itemActiveBg: '#0F48AB',
            colorPrimary: '#ffffff',
            itemBg: '#ffffff',
          },
          Select: {
            fontSize: 12,
            controlHeightSM: 20,
            controlHeight: 20,
            controlHeightLG: 20,
            controlHeightXS: 20,
          },
          Button: {
            textTextColor: '#87898e',
          },
        },
      }}
    >
      <div
        onClick={handleClose}
        className="relative h-full w-full"
        ref={tableContainerRef}
      >
        <Table<RecordType>
          bordered={false}
          columns={mergedColumns}
          rowKey="id"
          dataSource={yAxis === 0 ? [] : data}
          onChange={() => {
            setChangeTableData(!changeTableData);
          }}
          pagination={{
            defaultPageSize: 50,
            showQuickJumper: true,
            showPrevNextJumpers: true,
            showSizeChanger: true,
          }}
          scroll={{ y: yAxis }}
          size="small"
          rowClassName={(_, index) =>
            index % 2 === 0 ? 'bg-bg-table-row-even' : 'table-row-odd'
          }
          rowHoverable={true}
          footer={() => footerContent}
        />
        {popover.visible && (
          <Popover
            overlayInnerStyle={{ padding: 0 }}
            content={<ContextMenuPopover onAction={() => {}} highlight="" />}
            open={popover.visible}
            placement="rightTop"
            arrow={false}
          >
            <div
              style={{
                position: 'fixed',
                left: popover.x,
                top: popover.y,
                zIndex: 9999,
                width: 1,
                height: 'auto',
              }}
            />
          </Popover>
        )}
      </div>
    </ConfigProvider>
  );
};

export default Trading;
