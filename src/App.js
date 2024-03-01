// Dependencies and Modules
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

// Pages and Components
import AppNavbar from './components/AppNavbar.js';
import Home from './pages/Home.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import Products from './pages/Products.js';
import CreateProduct from './pages/CreateProduct.js';
import Cart from './pages/Cart.js';
import Orders from './pages/Orders.js';
import NotFound from './pages/NotFound.js';
import { UserProvider } from './UserContext.js';

function App() {

  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(typeof data.user !== 'undefined'){
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });
      } else {
        setUser({
          id: null,
          isAdmin: null
        });
      }
    });
  }, [])

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Container fluid>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/register" element={<Register />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/logout" element={<Logout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/createProduct" element={<CreateProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
