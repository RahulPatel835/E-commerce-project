import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';

function Citymgt() {
    const [ctid, setCtid] = useState('');
    const [ctname, setctName] = useState('');
    const [status, setStatus] = useState('');
    const [stid, setstid] = useState('');
    const [stList, setStList] = useState([]);
    const [ctlist, setCtList] = useState([]);

    const handlectname = (evt) => setctName(evt.target.value.toUpperCase());
    const handlestatus = (evt) => setStatus(evt.target.value);
    const handlectid = (evt) => setCtid(evt.target.value);
    const handlestid = (evt) => setstid(evt.target.value.toUpperCase());

    // Fetch state list on component mount
    useEffect(() => {
        axios.get('http://localhost:9679/state/getall')
            .then((res) => {
                setStList(res.data);
            })
            .catch(err => {
                alert(err.message);
            });
    }, []); // Empty dependency array ensures this runs only on mount

    const handleSaveButton = () => {
        if (!stid || !ctname || !status || !ctid) {
            alert("Please fill all fields");
            return;
        }

        axios.get(`http://localhost:9679/city/searchbyname/${ctname}`)
            .then((res) => {
                if (res.data.ctname) {
                    alert("City Name is already defined");
                    return;
                } else {
                    const obj = { ctid, ctname, stid, status };
                    axios.post('http://localhost:9679/city/save', obj)
                        .then((res) => {
                            alert(res.data);
                            console.log(res.data)
                            setstid('');
                            setctName('');
                            setStatus('');
                            setCtid('');
                            handleShowButton();
                        })
                        .catch(err => {
                            alert(err.message);
                        });
                }
            })
            .catch(err => {
                alert(err.message);
            });
    };

    const handleaddID = () => {
        axios.get('http://localhost:9679/city/getall')
            .then((res) => {
                setStatus(1);
                setCtid(res.data.length + 1);
            })
            .catch(err => {
                alert(err.message);
            });
    };

    const handleShowButton = () => {
        axios.get('http://localhost:9679/city/getall')
            .then((res) => {
                setCtList(res.data);
                console.log(res.data)
            })
            .catch(err => {
                alert(err.message);
            });
    };

    const handleUpdateStatus = (ctid, currentStatus) => {
        const updatedStatus = currentStatus === 1 ? 0 : 1;
        const obj2 = {
            ctid: ctid,
            status: updatedStatus
        };
        axios.put('http://localhost:9679/city/toggle', obj2).then((res) => {
            console.log(res.data);
            handleShowButton();
        }).catch(err => {
            console.log(err);
        });
    };


    const handleSearchButton = () => {
        if (ctid !== undefined && ctid !== "") {
            axios.get('http://localhost:9679/city/search/' + ctid).then(res => {
                if (ctid !== undefined) {
                    setCtid(res.data.ctid);
                    setctName(res.data.ctname);
                    setstid(res.data.stid);
                    setStatus(res.data.status);
                }
                else {
                    alert("ID not found");
                }
            }).catch(err => {
                console.log(err);
            });
        }

        if (ctname !== undefined && ctname !== "") {
            axios.get('http://localhost:9679/city/searchbyname/' + ctname).then(res => {
                if (ctname !== undefined) {
                    setCtid(res.data.ctid);
                    setctName(res.data.ctname);
                    setstid(res.data.stid);
                    setStatus(res.data.status);
                }
                else {
                    alert("Name not found");

                }
            }).catch(err => {
                console.log(err);
            });
        }
    };

    const handleUpdateButton = () => {
        if (!stid || !ctname || !status || !ctid) {
            alert("Please fill all fields");
            return;
        }

        const obj = { stid, ctname, status, ctid };
        axios.put('http://localhost:9679/city/update/', obj)
            .then(res => {
                console.log(res.data);
                setstid('');
                setctName('');
                setStatus('');
                setCtid('');
                handleShowButton();
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    return (
        <>
            <center>
                <h6>City Management</h6>
                <div className='mydiv'>
                    <table>
                        <tbody>
                            <tr>
                                <td>City Id</td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={handlectid}
                                        className='form-control'
                                        value={ctid}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>City Name</td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={handlectname}
                                        className='form-control'
                                        value={ctname}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>State ID</td>
                                <td>
                                    <select className='form-control' value={stid} onChange={handlestid}>
                                        <option value="" disabled>Select state</option>
                                        {stList.map(item => (
                                            <option key={item.stid} value={item.stid}>
                                                {item.stname}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>
                                    <input
                                        type="number"
                                        value={status}
                                        onChange={handlestatus}
                                        className='form-control'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button
                                        type='button'
                                        onClick={handleaddID}
                                        className='btn btn-outline-primary'
                                    >
                                        Add New ID
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type='button'
                                        onClick={handleSaveButton}
                                        className='btn btn-outline-secondary'
                                    >
                                        Save
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type='button'
                                        onClick={handleShowButton}
                                        className='btn btn-outline-success'
                                    >
                                        Show
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type='button'
                                        onClick={handleSearchButton}
                                        className='btn btn-outline-danger'
                                    >
                                        Search
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type='button'
                                        onClick={handleUpdateButton}
                                        className='btn btn-outline-info'
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </center>
            <center className='Centre2'>
                <h6>City List</h6>
                <table className='table2'>
                    <thead>
                        <tr className='tr'>
                            <th className='thead'>City ID</th>
                            <th className='thead'>City Name</th>
                            <th className='thead'>State ID</th>
                            <th className='thead'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ctlist.map(item => {

                            const state = stList.find(value => value.stid === item.stid);
                            const stname = state ? state.stname : 'Unknown';
                            return (
                                <tr className='tr' key={item.ctid}>
                                    <td className='td'>{item.ctid}</td>
                                    <td className='td'>{item.ctname}</td>
                                    <td className='td'>{stname}</td>
                                    <td className='td'>
                                        <button
                                            className="btn btn-outline-warning"
                                            type='button'
                                            onClick={() => handleUpdateStatus(item.ctid, item.status)}
                                        >
                                            {item.status === 1 ? 'Enabled' : 'Disabled'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </center>
        </>
    );
}

export default Citymgt;


