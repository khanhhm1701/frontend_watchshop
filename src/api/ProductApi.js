import axios from "axios";
export const axiosJWT = axios.create();

export const getAllProducts = async (search) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}`);
  } else {
    res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
  }
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data);
  return res.data;
};

export const getDetailsProduct = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`);
  return res.data;
};

export const updateProduct = async (id, access_token, data) => {
  const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const deleteManyProduct = async (ids, access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many`, ids, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getAllType = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`);
  return res.data;
};

