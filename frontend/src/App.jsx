import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./redux/slices/authSlice";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
import Shop from "./pages/ShopPage";
import ProductDetail from "./pages/ProductDetailPage";

const App=()=> {
  const location = useLocation();
  const dispatch = useDispatch();
  const authPages = ["/login", "/register", "/verify-otp"];
  const hideLayout = authPages.includes(location.pathname);

  // 🔥 AUTO LOGIN ON APP START
useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/detail" element={<ProductDetail/>}/>
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App

