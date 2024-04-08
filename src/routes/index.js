import AdminPage from "../pages/Admin/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

export const routes = [
  { path: "/", page: HomePage, isShowHeader: true, isPrivate: false  },
  { path: "/products", page: ProductsPage, isShowHeader: true, isPrivate: false },
  { path: "/order", page: OrderPage, isShowHeader: true, isPrivate: false },
  { path: "/payment", page: PaymentPage, isShowHeader: true, isPrivate: false },
  { path: "/order-success", page: OrderSuccess, isShowHeader: true, isPrivate: false },
  { path: "/my-order", page: MyOrderPage, isShowHeader: true, isPrivate: false },
  { path: "/type", page: TypeProductPage, isShowHeader: true, isPrivate: false },
  { path: "/sign-in", page: SignInPage, isShowHeader: false, isPrivate: false },
  { path: "/sign-up", page: SignUpPage, isShowHeader: false, isPrivate: false },
  { path: "/details/:id", page: ProductDetailPage, isShowHeader: true, isPrivate: false },
  { path: "/profile", page: ProfilePage, isShowHeader: true, isPrivate: false },
  { path: "/system/admin", page: AdminPage, isShowHeader: false, isPrivate: true },
  { path: "*", page: NotFoundPage, isPrivate: false},
];
