import { DeleteOutlined, FormOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Input, Modal, Space } from "antd";
import "./admin.scss";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import * as UserApi from "../../api/UserApi";

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenUpdateModel, setIsOpenUpdateModel] = useState(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);

  const inittial = () => ({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    address: "",
  });

  const [stateUserDetails, setStateUserDetails] = useState(inittial());

  const [form] = Form.useForm();
  const user = useSelector((state) => state?.user);

  console.log("user", user);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelUpdate = () => {
    setIsOpenUpdateModel(false);
  };

  const handleCancelDelete = () => {
    setIsOpenDeleteModel(false);
  };

  const handleDetailsUser = () => {
    setIsOpenUpdateModel(true);
  };

  const fetchGetDetailsUser = async (selected) => {
    const res = await UserApi.getDetailsUser(selected, user?.access_token);
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
        address: res?.data?.address,
        avatar: res.data?.avatar,
      });
    }
  };

  const getAllUsers = async () => {
    const res = await UserApi.getAllUsers(user?.access_token);
    return res;
  };

  const queryUser = useQuery({ queryKey: ["users"], queryFn: getAllUsers });
  const { data: users } = queryUser;

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserApi.updateUser(id, token, rests);
    return res;
  });

  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserApi.deleteUser(id, token);
    return res;
  });

  const mutationDeleteManyUser = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = UserApi.deleteManyUser(ids, token);
    return res;
  });

  const { data: dataUpdated } = mutationUpdate;
  const { data: dataDeleted } = mutationDelete;
  const { data: dataDeletedMany } = mutationDeleteManyUser;

  useEffect(() => {
    if (dataUpdated?.status === "OK") {
      message.success("Cập nhật thành công!");
      handleCancelUpdate();
    } else if (dataUpdated?.status === "ERR" || dataUpdated?.status === "ERROR") {
      message.error("Cập nhật thất bại!");
    }
  }, [dataUpdated?.status]);

  useEffect(() => {
    if (dataDeleted?.status === "OK") {
      message.success("Xóa thành công!");
      handleCancelDelete();
    } else if (dataDeleted?.status === "ERR" || dataDeleted?.status === "ERROR") {
      message.error("Xóa không thành công!");
    }
  }, [dataDeleted?.status]);

  useEffect(() => {
    if (dataDeletedMany?.status === "OK") {
      message.success("Xóa thành công!");
      handleCancelDelete();
    } else if (dataDeletedMany?.status === "ERR" || dataDeletedMany?.status === "ERROR") {
      message.error("Xóa không thành công!");
    }
  }, [dataDeletedMany?.status]);

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateUserDetails);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateUserDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onUpdateUser = (values) => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...values },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const handleDeleteUser = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  };

  const handleDeleteManyUser = (ids) => {
    mutationDeleteManyUser.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      }
    );
  }

  const renderAction = () => {
    return (
      <div className="flex gap-3">
        <FormOutlined className="text-xl text-sky-700 cursor-pointer hover:opacity-70" onClick={handleDetailsUser} />
        <DeleteOutlined className="text-xl text-rose-700 cursor-pointer hover:opacity-70" onClick={() => setIsOpenDeleteModel(true)} />
      </div>
    );
  };

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
      title: "Tên người dùng",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
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
      title: "Là quản lý?",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "Quản lý",
          value: true,
        },
        {
          text: "Khách hàng",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        console.log('record', record)
        if (value === true) {
          return record.isAdmin === 'TRUE'
        } else {
          return record.isAdmin === 'FALSE'
        }
      },
    },

    {
      title: "Hành động",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTbl = users?.data?.map((user) => {
    return { ...user, key: user._id, isAdmin: user.isAdmin ? "TRUE" : "FALSE" };
  });

  console.log("users", users);

  return (
    <div>
      <div className="px-12 mt-8 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Quản lý người dùng</h2>
        </div>
        <div className="mt-8">
          <TableComponent
            columns={columns}
            data={dataTbl}
            handleDeleteMany = {handleDeleteManyUser}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setRowSelected(record._id);
                },
              };
            }}
          />
        </div>
      </div>

      {/* Modal Sửa */}
      <Modal title="Chi tiết người dùng" open={isOpenUpdateModel} onCancel={() => setIsOpenUpdateModel(false)} footer={null}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onUpdateUser}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          {/* Name */}
          <Form.Item
            label="Tên người dùng"
            name="name"
            rules={[
              {
                required: true,
                message: "Nhập tên người dùng!",
              },
            ]}
          >
            <Input value={stateUserDetails.name} />
          </Form.Item>

          {/* Email */}

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Nhập email người dùng!",
              },
            ]}
          >
            <Input value={stateUserDetails.email} />
          </Form.Item>

          {/* Phone */}

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Nhập số điện thoại!",
              },
            ]}
          >
            <Input value={stateUserDetails.phone} />
          </Form.Item>

          {/* Address */}

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Nhập địa chỉ người dùng!",
              },
            ]}
          >
            <Input value={stateUserDetails.address} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Xóa */}
      <Modal title="Xóa người dùng" open={isOpenDeleteModel} onCancel={() => setIsOpenDeleteModel(false)} onOk={handleDeleteUser}>
        <p>Bạn có chắc muốn xóa người dùng này?</p>
      </Modal>
    </div>
  );
};

export default AdminUser;
