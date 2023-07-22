import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import ProductDetails from "./Pages/ProductDetails";
import Marques from "./Pages/Marques";
import Profile from "./Pages/Profile";
import Orders from "./Pages/Orders";
import OrderDetails from "./Pages/OrderDetails";
import NotFound from "./Pages/NotFound";
import ProtectedRoute from "./Helpers/ProtectedRoute";
import ProtectedAdminRoute from "./Helpers/ProtectedAdminRoute";
import PublicRoute from "./Helpers/PublicRoute";
import HomeNavbar from "./Components/HomeNavbar";
import { useSelector } from "react-redux";
import Footer from "./Components/Footer";
import SideBar from "./Components/SideBar";
import Navbar from "./Components/Navbar";
import Statistics from "./Pages/Statistics";
import EditProfile from "./Pages/EditProfile";

function App() {
const {Token}=useSelector(state=>state.auth)
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/marques"
          element={
            <ProtectedAdminRoute>
              <Marques />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <ProtectedAdminRoute>
              <Statistics />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PublicRoute>
              <Cart />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            !Token ? (
              <>
                <HomeNavbar />
                <ProductDetails />
                <Footer />
              </>
            ) : (
              <div
                className="page-wrapper"
                id="main-wrapper"
                data-layout="vertical"
                data-navbarbg="skin6"
                data-sidebartype="full"
                data-sidebar-position="fixed"
                data-header-position="fixed"
              >
                <SideBar />
                <div className="body-wrapper">
                  <Navbar />
                  <ProductDetails />
                </div>
              </div>
            )
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedAdminRoute>
              <Orders />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <ProtectedAdminRoute>
              <OrderDetails />
            </ProtectedAdminRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
