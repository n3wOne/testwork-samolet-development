import React, { useContext, useState } from "react";
import { Table, Input, Button, Switch, Form } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { DataProvider } from "../app/App";
import { DETAILS_PATH, ROOT_PATH, SHOW_ALL_ITEMS } from "../Constants";

const DataTable = () => {
  const data = useContext(DataProvider);
  const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
    showFullData: false,
  });

  const handleShowFullDataChange = () => {
    setState({ showFullData: !state.showFullData });
  };

  const getColumnSearchProps = (dataIndex) => {
    let searchInput = React.createRef();
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              searchInput = node;
            }}
            placeholder={`Поиск по ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.select());
        }
      },
      render: (text) =>
        state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    };
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };

  const prepareColumns = () => {
    const keyList = !state.showFullData
      ? ["order", "fullname", "territory", "address", "formname", "libraries"]
      : Object.keys(data[0]);

    return keyList.map((item) => {
      const customRender =
        item === "fullname"
          ? {
              render: (text, record) => (
                <Link
                  to={{
                    pathname: `${ROOT_PATH}${DETAILS_PATH}/${record.order}`,
                    state: record,
                  }}
                >
                  {text}
                </Link>
              ),
            }
          : null;
      const sorter =
        item === "libraries"
          ? { sorter: (a, b) => a.libraries - b.libraries }
          : null;
      const filter =
        item === "territory" ? { ...getColumnSearchProps("territory") } : null;
      return {
        title: item.replace(item.charAt(0), item.charAt(0).toUpperCase()),
        dataIndex: item,
        key: item,
        ...customRender,
        ...sorter,
        ...filter,
      };
    });
  };

  return (
    <>
      <Form.Item label={SHOW_ALL_ITEMS}>
        <Switch
          checked={state.showFullData}
          onChange={handleShowFullDataChange}
        />
      </Form.Item>
      <Table
        dataSource={data}
        columns={prepareColumns()}
        pagination={{ pageSize: 50 }}
      />
    </>
  );
};

export default DataTable;
