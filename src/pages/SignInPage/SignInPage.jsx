import React, { useEffect, useState } from "react";
import Logo from "../../assets/img/shop_logo.png";
import LoginBackground from "../../assets/img/background/login_bg.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as UserApi from "../../api/UserApi";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => UserApi.loginUser(data));

  const { data } = mutation;

  useEffect(() => {
    if (data?.status === "OK") {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate("/");
      }

      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [data?.status]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserApi.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${LoginBackground})` }}>
      <div className="absolute top-20 right-32 w-1/3 p-8 bg-white border-y-8 border-yellow-500">
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Đăng Nhập</h2>
          <Link to={"/"}>
            <img className="w-36" src={Logo} alt="" />
          </Link>
        </div>
        <div>
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
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-gray-800">
              Mật Khẩu
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-b-yellow-600 focus:border-b-2 transition duration-300 ease-in-out"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {data?.status === "ERR" && <div className="mb-4 w-full text-center text-sm text-red-600">{data?.message}</div>}
          <hr className="border-gray-300 border-1  w-2/3 mx-auto mb-6" />

          <button
            disabled={!email.length || !password.length}
            onClick={handleSubmit}
            className={`w-full h-12 text-lg font-bold ${!email.length || !password.length ? "bg-gray-300" : "bg-black hover:opacity-80"} text-white`}
          >
            Đăng Nhập
          </button>
        </div>
        <div className="mt-6 w-full text-center">
          <span>Bạn chưa có tài khoản? </span>
          <Link to="/sign-up" className="font-bold cursor-pointer text-yellow-600">
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
