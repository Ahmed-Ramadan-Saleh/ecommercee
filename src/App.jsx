import { BrowserRouter, Routes, Route } from "react-router-dom";

// User
import Home from "./user/home/home";
import Signup from "./user/signup/signup";
import Signin from "./user/signin/signin";
import Account from "./user/account/account";
import Cart from "./user/Cart/cart";
import Wishlist from "./user/wishlist/wishlist";
import Category from "./user/Category/category";
import Detail from "./user/Detail/detail";
import About from "./user/about/about";
import Checkout from "./user/checkout/checkout";
import Contact from "./user/contact/contact";
import Page404 from "./user/page404/page404";
import Header from "./user/component/header/header";
import Footer from "./user/component/footer/footer";

// Admin
import AdminLogin from "./admin/adminLogin/adminLogin";
import Dashboard from "./admin/dashboard/dashboard";
import ProductManagement from "./admin/productManagement/productManagement";
import CustomerManagement from "./admin/customerManagement/customerManagement";
import OrderManagement from "./admin/orderManagement/orderManagement";
import MarketingContent from "./admin/marketingContent/marketingContent";
import AppearanceSettings from "./admin/appearanceSettings/appearanceSettings";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/category" element={<Category />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/customers" element={<CustomerManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/admin/marketing" element={<MarketingContent />} />
        <Route path="/admin/appearance" element={<AppearanceSettings />} />

        {/* 404 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
