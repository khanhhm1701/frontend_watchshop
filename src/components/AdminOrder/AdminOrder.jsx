import { DeleteOutlined, FormOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Input, Modal, Space } from "antd";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import * as OrderApi from "../../api/OrderApi";
import { orderContant } from "../../constant";
import { currencyFormatter } from "../../service/currencyFormater";

const AdminOrder = () => {
  const user = useSelector((state) => state?.user);

  const getAllOrders = async () => {
    const res = await OrderApi.getAllOrders(user?.access_token);
    return res;
  };

  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrders });
  const { data: orders } = queryOrder;
  console.log("orders", orders);

  // Table

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Đặt lại
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
    },

    {
      title: "Phương thức thanh toán",
      dataIndex: "payment",
      filters: [
        {
          text: "Tiền mặt",
          value: true,
        },
        {
          text: "Paypal",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record.paymentMethod === "COD";
        } else {
          return record.paymentMethod === "Paypal";
        }
      },
    },
    {
      title: "Giá trị đơn hàng",
      dataIndex: "price",
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },
  ];

  const dataTbl = orders?.data?.map((order) => {
    return {
      ...order,
      key: order._id,
      name: order?.shippingAddress?.fullName,
      phone: order?.shippingAddress?.phone,
      address: order?.shippingAddress?.address,
      payment: orderContant.payment.name[order?.paymentMethod],
      price: currencyFormatter.format(order?.totalPrice),
    };
  });   

  console.log("orders", orders);

  return (
    <div>
      <div className="px-12 mt-8 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Quản lý đơn hàng</h2>
        </div>
        <div className="mt-8">
          <TableComponent
            columns={columns}
            data={dataTbl}
            // handleDeleteMany={handleDeleteManyUser}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
