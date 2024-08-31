import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

function Usermgt() {
    const [Ctlist, setCtList] = useState([]);
    const [Vtlist, setVtList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleShowButton = () => {
        setLoading(true);
        axios.get('http://localhost:9679/customer/getcustomercount')
            .then((res) => {
                setCtList(res.data);
            })
            .catch(err => {
                console.error(err);
                alert('Failed to load customer data.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleVShowButton = () => {
        setLoading(true);
        axios.get('http://localhost:9679/vender/getvendercount')
            .then((res) => {
                setVtList(res.data);
            })
            .catch(err => {
                console.error(err);
                alert('Failed to load vendor data.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleUpdateStatusC = (Cid, currentStatus) => {
        const updatedStatus = currentStatus === 'active' ? 'deactive' : 'active';
        const obj2 = { Cid, CStatus: updatedStatus };

        axios.put('http://localhost:9679/customer/toggle', obj2)
            .then((res) => {
                console.log('Status update response:', res.data);
                handleShowButton();
            })
            .catch(err => {
                console.error('Error updating status:', err);
                alert('Failed to update status.');
            });
    };
    const handleUpdateStatusV = (Vid, currentStatus) => {
        const updatedStatus = currentStatus === 'active' ? 'deactive' : 'active';
        const obj2 = {
            Vid, VStatus: updatedStatus
        };

        axios.put('http://localhost:9679/vender/toggle', obj2)
            .then((res) => {
                console.log('Status update response:', res.data);
                handleVShowButton();
            })
            .catch(err => {
                console.error('Error updating status:', err);
                alert('Failed to update status.');
            });
    };




    return (
        <div className="user-management">
            <center>
                <h6>State Management</h6>
                <div className='mydiv'>
                    <table>
                        <tbody>
                            <tr>
                                <td>Customer Approval List</td>
                                <td>
                                    <button type='button' onClick={handleShowButton} disabled={loading}>
                                        {loading ? 'Loading...' : 'Customer Show'}
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Vendor Approval List</td>
                                <td>
                                    <button type='button' onClick={handleVShowButton} disabled={loading}>
                                        {loading ? 'Loading...' : 'Vendor Show'}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </center>
            <center>
                <table>
                    <thead>
                        <tr>
                            <th>CUserId</th>
                            <th>Cuserpass</th>
                            <th>CustomerName</th>
                            <th>State ID</th>
                            <th>City Id</th>
                            <th>CAddress</th>
                            <th>CEmail</th>
                            <th>CContact</th>
                            <th>CPicName</th>
                            <th>Cid</th>
                            <th>CStatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Ctlist.map((item, index) => (
                            <tr key={index}>
                                <td>{item.CUSerId}</td>
                                <td>{item.CUserPass}</td>
                                <td>{item.CustomerName}</td>
                                <td>{item.StId}</td>
                                <td>{item.CtId}</td>
                                <td>{item.CAddress}</td>
                                <td>{item.CEmail}</td>
                                <td>{item.CConatct}</td>
                                <td>{item.CPicName}</td>
                                <td>{item.Cid}</td>
                                <td>{item.CStatus}</td>
                                <td className='td'>
                                    <button
                                        className="btn btn-outline-warning"
                                        type='button'
                                        onClick={() => handleUpdateStatusC(item.Cid, item.CStatus)}
                                    >
                                        {item.CStatus === 'active' ? 'Deactive' : 'Active'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
            <center>
                <table>
                    <thead>
                        <tr>
                            <th>VUSerId</th>
                            <th>Vuserpass</th>
                            <th>VendorName</th>
                            <th>VAddress</th>
                            <th>VContact</th>
                            <th>VEmail</th>
                            <th>VPicName</th>
                            <th>Vid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Vtlist.map((item, index) => (
                            <tr key={index}>
                                <td>{item.VUSerId}</td>
                                <td>{item.VUserPass}</td>
                                <td>{item.VenderName}</td>
                                <td>{item.VAddress}</td>
                                <td>{item.VContact}</td>
                                <td>{item.VEmail}</td>
                                <td>{item.VPicName}</td>
                                <td>{item.Vid}</td>
                                <td>{item.VStatus}</td>
                                <td className='td'>
                                    <button
                                        className="btn btn-outline-warning"
                                        type='button'
                                        onClick={() => handleUpdateStatusV(item.Vid, item.VStatus)}
                                    >
                                        {item.VStatus === 'active' ? 'Deactive' : 'Active'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default Usermgt;
