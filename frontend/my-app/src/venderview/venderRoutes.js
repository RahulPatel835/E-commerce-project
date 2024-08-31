import React from 'react';
import VenderReg from './venderReg';
import VenderLogin from './venderLogin';
import { Route, Routes, Link } from 'react-router-dom';
import venderPic from '../Image/VenderPic.webp'
import './vender.css'
function VenderRoutes() {
    return (
        <>
            <div className="container">
                <img src={venderPic} alt="" height={300} width={1000} />
            </div>
            <nav>
                <ul>
                    <li><Link to="/venderReg">Register</Link></li>
                    <li><Link to="/venderLogin">Login</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/venderReg" element={<VenderReg />} />
                <Route path="/venderLogin" element={<VenderLogin />} />
            </Routes>
        </>)
}
export default VenderRoutes;