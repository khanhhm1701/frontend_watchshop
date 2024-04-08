import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as UserApi from "../../api/UserApi";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.name);
  const [phone, setPhone] = useState(user?.phone);
  const [address, setAddress] = useState(user?.address);

  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserApi.updateUser(id, access_token, rests);
  });

  const { data, isSuccess, isError } = mutation;
  // console.log("data", data);

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Cập nhật thành công");
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error("Cập nhật thất bại");
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserApi.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleUpdate = () => {
    mutation.mutate({ id: user?.id, access_token: user?.access_token, email, name, phone, address });
  };

  return (
    <div className="mt-16 p-16 px-32 flex gap-12">
      <div className="flex flex-col border w-1/4 p-8 items-center">
        <img className="w-20 border border-yellow-600 rounded-full p-2" src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="" />
        <p className="font-semibold text-lg mt-4">{user?.name}</p>
        <div className="mt-4 py-4 border-y flex flex-col gap-2 w-full">
          <p><i className="fa-solid fa-envelope w-12 text-center"></i>{user?.email}</p>
          <p><i className="fa-solid fa-phone w-12 text-center"></i>{user?.phone}</p>
          <p><i className="fa-solid fa-location-dot w-12 text-center"></i>{user?.address}</p>
        </div>
        <button onClick={() => navigate("/sign-in")} className="bg-black text-white font-semibold text-lg w-full mt-8 p-2 hover:opacity-70">
          Đăng xuất
        </button>
      </div>
      <div className="flex-1 p-8 border">
        <h2 className="font-bold text-2xl mb-4 ">Thông tin tài khoản</h2>
        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-gray-800">
            Email
          </label>

          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-b-yellow-600 focus:border-b-2 transition duration-300 ease-in-out"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Name */}
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-gray-800">
            Họ tên
          </label>

          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-b-yellow-600 focus:border-b-2 transition duration-300 ease-in-out"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* Phone */}
        <div className="mb-6">
          <label htmlFor="phone" className="block mb-2 text-gray-800">
            Số điện thoại
          </label>

          <input
            type="text"
            id="phone"
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-b-yellow-600 focus:border-b-2 transition duration-300 ease-in-out"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        {/* Adress */}
        <div className="mb-6">
          <label htmlFor="adress" className="block mb-2 text-gray-800">
            Địa chỉ
          </label>

          <input
            type="text"
            id="adress"
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-b-yellow-600 focus:border-b-2 transition duration-300 ease-in-out"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-8">
          <button onClick={handleUpdate} className="w-32 bg-black py-2 text-white font-semibold hover:opacity-75">
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
