import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import Pictorial from './pages/Pictorial';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Success from './pages/Success';
import Admin from "./pages/admin/Admin";
import AdminUserList from "./pages/adminUserList/AdminUserList";
import AdminUser from "./pages/adminUser/AdminUser";
import AdminNewUser from "./pages/adminNewUser/AdminNewUser";
import AdminProductList from "./pages/adminProductList/AdminProductList";
import AdminProduct from "./pages/adminProduct/AdminProduct";
import AdminNewProduct from "./pages/adminNewProduct/AdminNewProduct";
import { useSelector } from 'react-redux';
import ScrollToTop from './ScrollToTop';

const App = () => {
    const user = useSelector(state => state.auth.currentUser);

    return (
        <BrowserRouter>
            <ScrollToTop>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/products/:category" element={<ProductList />}/>                
                    <Route path="/product/:id" element={<Product />}/>
                    <Route path="/pictorial/:category" element={<Pictorial />}/>
                    <Route path="/cart" element={<Cart />}/>
                    <Route path="/success" element={<Success />}/>
                    <Route path="/register" element={user ? <Navigate to="/"/> : <Register />}/>
                    <Route path="/login" element={user ? <Navigate to="/"/> : <Login />}/>
                    <Route path="/admin" element={user?.isAdmin ? <Admin /> : <Navigate to="/"/>}/>
                    <Route path="/adminUsers" element={user?.isAdmin ? <AdminUserList /> : <Navigate to="/"/>}/>
                    <Route path="/adminUser/:userId" element={user?.isAdmin ? <AdminUser /> : <Navigate to="/"/>}/>
                    <Route path="/adminNewUser" element={user?.isAdmin ? <AdminNewUser /> : <Navigate to="/"/>}/>
                    <Route path="/adminProducts" element={user?.isAdmin ? <AdminProductList /> : <Navigate to="/"/>}/>
                    <Route path="/adminProduct/:productId" element={user?.isAdmin ? <AdminProduct /> : <Navigate to="/"/>}/>
                    <Route path="/adminNewProduct" element={user?.isAdmin ? <AdminNewProduct /> : <Navigate to="/"/>}/>
            </Routes>
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default App;
