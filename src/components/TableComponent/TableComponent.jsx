import { Table } from "antd";
import React, { useMemo, useState } from "react";
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { columns, data, handleDeleteMany } = props;

  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== "action");
    return arr;
  }, [columns]);

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const handleExportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(data, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <div>
      <button onClick={handleExportExcel} className="mb-4 px-4 py-1 bg-slate-100 border border-teal-500 text-sm hover:bg-teal-50">
        <i className="fa-solid fa-download mr-2"></i>Xuất file Excel
      </button>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
      {selectedRowKeys.length > 0 && (
        <button
          onClick={() => handleDeleteMany(selectedRowKeys)}
          className="font-semibold text-white text-base bg-rose-700 rounded px-4 py-2 mb-2 hover:opacity-70"
        >
          Xóa tất cả
        </button>
      )}
    </div>
  );
};

export default TableComponent;
