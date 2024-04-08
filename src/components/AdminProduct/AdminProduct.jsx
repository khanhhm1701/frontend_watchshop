import { DeleteOutlined, FormOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Input, Modal, Space } from "antd";
import "./admin.scss";
import * as ProductApi from "../../api/ProductApi";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenUpdateModel, setIsOpenUpdateModel] = useState(false);
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);

  const inittial = () => ({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
  });

  const [stateProductDetails, setStateProductDetails] = useState(inittial());

  const [form] = Form.useForm();
  const user = useSelector((state) => state?.user);

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

  const handleDetailsProduct = () => {
    setIsOpenUpdateModel(true);
  };

  const fetchGetDetailsProduct = async (selected) => {
    const res = await ProductApi.getDetailsProduct(selected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
      });
    }
  };

  const getAllProducts = async () => {
    const res = await ProductApi.getAllProducts();
    return res;
  };

  const queryProduct = useQuery({ queryKey: ["products"], queryFn: getAllProducts });
  const { data: products } = queryProduct;

  const mutation = useMutationHooks((data) => {
    const { name, price, description, rating, image, type, countInStock } = data;
    const res = ProductApi.createProduct({
      name,
      price,
      description,
      rating,
      image,
      type,
      countInStock,
    });
    return res;
  });
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductApi.updateProduct(id, token, rests);
    return res;
  });
  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductApi.deleteProduct(id, token);
    return res;
  });

  const mutationDeleteManyProduct = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = ProductApi.deleteManyProduct(ids, token);
    return res;
  });

  const { data } = mutation;
  const { data: dataUpdated } = mutationUpdate;
  const { data: dataDeleted } = mutationDelete;
  const { data: dataDeletedMany } = mutationDeleteManyProduct;

  useEffect(() => {
    if (data?.status === "OK") {
      message.success("Thêm sản phẩm thành công!");
      handleCancel();
    } else if (data?.status === "ERR") {
      message.error("Thêm sản phẩm thất bại!");
    }
  }, [data?.status]);

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
      form.setFieldsValue(stateProductDetails);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateProductDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected]);

  const onFinish = (values) => {
    mutation.mutate(values, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onUpdateProduct = (values) => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...values },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const handleDeleteProduct = () => {
    mutationDelete.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const handleDeleteManyProduct = (ids) => {
    mutationDeleteManyProduct.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  }

  const renderAction = () => {
    return (
      <div className="flex gap-3">
        <FormOutlined className="text-xl text-sky-700 cursor-pointer hover:opacity-70" onClick={handleDetailsProduct} />
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
      title: "Tên sản phẩm",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Thương hiệu",
      dataIndex: "type",
      sorter: (a, b) => a.type.length - b.type.length,
      ...getColumnSearchProps("type"),
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a, b) => (Number(a.price)) - (Number(b.price))
    },
    {
      title: "Số sao đánh giá",
      dataIndex: "rating",
      sorter: (a, b) => (Number(a.rating)) - (Number(b.rating)),
      filters: [
        {
          text: '>= 4',
          value: '>=', 
        },
        {
          text: '<= 4',
          value: '<=',
        },
      ],
      onFilter: (value, record) => {
        if(value ==='>=') {
          return Number(record.rating) >= 4
        } else {
          return Number(record.rating) <= 4
        }
      }
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTbl = products?.data?.map((product) => {
    return { ...product, key: product._id };
  });

  return (
    <div>
      <div className="px-12 mt-8 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Quản lý sản phẩm</h2>
          <button onClick={showModal} className="bg-teal-700 text-white w-32 py-2 hover:opacity-70 font-semibold">
            {" "}
            <PlusOutlined className="mr-2" />
            Thêm
          </button>
        </div>
        <div className="mt-8">
          <TableComponent
            columns={columns}
            data={dataTbl}
            handleDeleteMany = {handleDeleteManyProduct}
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
      {/* Modal Thêm */}
      <Modal title="Thêm sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Name */}
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              {
                required: true,
                message: "Nhập tên sản phẩm!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Type */}

          <Form.Item
            label="Loại sản phẩm"
            name="type"
            rules={[
              {
                required: true,
                message: "Nhập loại sản phẩm!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Price */}

          <Form.Item
            label="Giá sản phẩm"
            name="price"
            rules={[
              {
                required: true,
                message: "Nhập giá sản phẩm!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* countInStock */}

          <Form.Item
            label="Số lượng trong kho"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Nhập số lượng trong kho!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* rating */}

          <Form.Item
            label="Số sao đánh giá"
            name="rating"
            rules={[
              {
                required: true,
                message: "Nhập chỉ số đánh giá!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Link ảnh sản phẩm"
            name="image"
            rules={[
              {
                required: true,
                message: "Chọn ảnh sản phẩm!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* description */}

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal Sửa */}
      <Modal title="Cập nhật sản phẩm" open={isOpenUpdateModel} onCancel={() => setIsOpenUpdateModel(false)} footer={null}>
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
          onFinish={onUpdateProduct}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          {/* Name */}
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              {
                required: true,
                message: "Nhập tên sản phẩm!",
              },
            ]}
          >
            <Input value={stateProductDetails.name} />
          </Form.Item>

          {/* Type */}

          <Form.Item
            label="Loại sản phẩm"
            name="type"
            rules={[
              {
                required: true,
                message: "Nhập loại sản phẩm!",
              },
            ]}
          >
            <Input value={stateProductDetails.type} />
          </Form.Item>

          {/* Price */}

          <Form.Item
            label="Giá sản phẩm"
            name="price"
            rules={[
              {
                required: true,
                message: "Nhập giá sản phẩm!",
              },
            ]}
          >
            <Input value={stateProductDetails.price} />
          </Form.Item>

          {/* countInStock */}

          <Form.Item
            label="Số lượng trong kho"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Nhập số lượng trong kho!",
              },
            ]}
          >
            <Input value={stateProductDetails.countInStock} />
          </Form.Item>

          {/* rating */}

          <Form.Item
            label="Số sao đánh giá"
            name="rating"
            rules={[
              {
                required: true,
                message: "Nhập chỉ số đánh giá!",
              },
            ]}
          >
            <Input value={stateProductDetails.rating} />
          </Form.Item>

          <Form.Item
            label="Link ảnh sản phẩm"
            name="image"
            rules={[
              {
                required: true,
                message: "Chọn ảnh sản phẩm!",
              },
            ]}
          >
            <Input value={stateProductDetails.image} />
          </Form.Item>

          {/* description */}

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input value={stateProductDetails.description} />
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
      <Modal title="Xóa sản phẩm" open={isOpenDeleteModel} onCancel={() => setIsOpenDeleteModel(false)} onOk={handleDeleteProduct}>
        <p>Bạn có chắc muốn xóa sản phẩm này?</p>
      </Modal>
    </div>
  );
};

export default AdminProduct;
