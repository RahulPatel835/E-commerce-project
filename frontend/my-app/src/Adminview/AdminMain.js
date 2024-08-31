import React from 'react';
import AdminReg from './AdminReg';
import AdminLogin from './AdminLogin';
import { Route, Routes, Link } from 'react-router-dom';
import AdminPic from '../Image/AdminPic.jpeg'
import CustomerRoutes from '../customerviews/customerMain'
import VenderRoutes from '../venderview/venderRoutes'
import Citymgt from './citymgt'
import Productmgt from './productmgt'
import Statetmgt from './statemgt'

// import './Admin.css'
function AdminRoutes() {
    return (
        <>
            <div className="container">
                <img src={AdminPic} alt="" height={300} width={1000} />
            </div>
            <nav>
                <ul>
                    <li><Link to="/AdminReg">Register</Link></li>
                    <li><Link to="/AdminLogin">Login</Link></li>
                    <li><Link to="/customer">Customer</Link></li>
                    <li><Link to="/vender">Vender</Link></li>
                    <li><Link to='/statemgt'>State Mangment</Link></li>
                    <li><Link to='/citymgt'>city Mangment</Link></li>
                    <li><Link to='/productmgt'>product Mangment</Link></li>

                </ul>
            </nav>
            <Routes>
                <Route path="/AdminReg" element={<AdminReg />} />
                <Route path="/AdminLogin" element={<AdminLogin />} />
                <Route path="/customer/*" element={<CustomerRoutes />} />
                <Route path="/vender/*" element={<VenderRoutes />} />
                <Route path="/statemgt" element={<Statetmgt />} />
                <Route path="/citymgt" element={<Citymgt />} />
                <Route path="/productmgt" element={<Productmgt />} />
            </Routes>
        </>)
}
export default AdminRoutes;

