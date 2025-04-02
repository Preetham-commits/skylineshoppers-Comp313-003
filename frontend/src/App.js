import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import Login from './components/Login';
import RegisterScreen from './screens/RegisterScreen';
import Dashboard from './components/Dashboard';
import ProductScreen from './screens/ProductScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import CartScreen from './screens/CartScreen'; // Import CartScreen
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen'; 
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'// Import PlaceOrderScreen

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return userInfo ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route 
              path='/shipping' 
              element={
                <PrivateRoute>
                  <ShippingScreen />
                </PrivateRoute>
              } 
            />
            <Route 
              path='/payment' 
              element={
                <PrivateRoute>
                  <PaymentScreen />
                </PrivateRoute>
              } 
            />
            <Route 
              path='/placeorder' 
              element={
                <PrivateRoute>
                  <PlaceOrderScreen />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
