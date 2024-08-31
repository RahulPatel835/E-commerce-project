import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

function Statemgt() {
    const [stid, setStid] = useState('');
    const [stname, setstName] = useState('');
    const [status, setStatus] = useState('');
    const [stlist, setStList] = useState([]);

    const handlestname = (evt) => {
        setstName(evt.target.value.toUpperCase());
    };

    const handlestatus = (evt) => {
        setStatus(evt.target.value);
    };
    const handlestid = (evt) => {
        setStid(evt.target.value);
    }
    const handleSaveButton = () => {
        if (!stid || !stname || !status) {
            alert("Please fill all fields");
            return;
        }

        axios.get('http://localhost:9679/state/searchbyname/' + stname).then((res) => {
            if (res.data.stname !== undefined) {
                alert("State Name is already defined");
            } else {
                const obj = {
                    stid: stid,
                    stname: stname.toUpperCase(),
                    status: status
                };
                alert(obj.status + obj.stid + obj.stname);
                axios.post('http://localhost:9679/state/save', obj).then(
                    (res) => {
                        alert(res.data);
                        setStid('');
                        setstName('');
                        setStatus('');
                        handleShowButton();
                    }
                ).catch(err => {
                    alert(err);
                });
            }
        }).catch(err => {
            alert(err);
        });
    };

    const handleaddID = () => {
        axios.get('http://localhost:9679/state/getall').then(
            (res) => {
                setStatus(1);
                setStid(res.data.length + 1);
            }
        ).catch(err => {
            alert(err);
        });
    };

    const handleShowButton = () => {
        axios.get('http://localhost:9679/state/getall').then((res) => {
            setStList(res.data);
        }).catch(err => {
            alert(err);
        });
    };

    const handleUpdateStatus = (stid, currentStatus) => {
        const updatedStatus = currentStatus === 1 ? 0 : 1;
        const obj2 = {
            stid: stid,
            status: updatedStatus
        };
        axios.put('http://localhost:9679/state/toggle', obj2).then((res) => {
            console.log(res.data);
            handleShowButton();
        }).catch(err => {
            console.log(err);
        });
    };

    const handleSearchButton = () => {
        if (stid !== undefined && stid !== "") {
            axios.get('http://localhost:9679/state/search/' + stid).then(res => {
                if (stid !== undefined) {
                    setStid(res.data.stid);
                    setstName(res.data.stname);
                    setStatus(res.data.status);
                }
                else {
                    alert("ID not found");
                }
            }).catch(err => {
                console.log(err);
            });
        }

        if (stname !== undefined && stname !== "") {
            axios.get('http://localhost:9679/state/searchbyname/' + stname).then(res => {
                if (stname !== undefined) {
                    setStid(res.data.stid);
                    setstName(res.data.stname);
                    setStatus(res.data.status);
                }
                else {
                    alert("Name not found");

                }
            }).catch(err => {
                console.log(err);
            });
        }

    }
    const handleUpdateButton = () => {
        if (!stid || !stname || !status) {
            alert("Please fill all fields");
            return;
        }
        else {
            axios.get('http://localhost:9679/state/searchbyname/' + stname).then(res => {
                if (res.data.stname !== undefined) {
                    alert("data is already found");
                    return;
                }
                else {
                    const obj = {
                        stid: stid,
                        stname: stname,
                        status: status
                    }
                    console.log(obj)
                    axios.put('http://localhost:9679/state/update/', obj).then(res => {
                        console.log(res.data);
                        setStid('');
                        setstName('');
                        setStatus('');
                        handleShowButton();
                    }).catch(err => {
                        console.log(err)
                    })
                }
            })
        }
    }
    // const handleDeleteButton = () => {
    //     if (!stid) {
    //         axios.delete('http://localhost:9679/state/delete/', stid).then(res => {
    //             console.log(res.data);
    //         }).catch(err => {
    //             console.log(err)
    //         })
    //     }
    //     else {
    //         alert("Please fill all fields");
    //     }
    // }

    return (
        <>
            <center>
                <h6>State Management</h6>
                <div className='mydiv'>
                    <table>
                        <tbody>
                            <tr>
                                <td>State Id</td>
                                <td> <input
                                    type="text"
                                    onChange={handlestid}
                                    className='form-control'
                                    value={stid}
                                /></td>
                            </tr>
                            <tr>
                                <td>State Name</td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={handlestname}
                                        className='form-control'
                                        value={stname}
                                    />
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
                                {/* <td>
                                    <button
                                        type='button'
                                        onClick={handleDeleteButton}
                                        className='btn btn-outline-danger'
                                    >
                                        Delete
                                    </button>
                                </td> */}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </center>
            <center className='Centre2'>
                <h6>State List</h6>
                <table className='table2'>
                    <thead>
                        <tr className='tr'>
                            <th className='thead'>State ID</th>
                            <th className='thead'>State Name</th>
                            <th className='thead'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stlist.map((item) => (
                            <tr className='tr' key={item.stid}>
                                <td className='td'>{item.stid}</td>
                                <td className='td'>{item.stname}</td>
                                <td className='td'>
                                    <button
                                        className="btn btn-outline-warning"
                                        type='button'
                                        onClick={() => handleUpdateStatus(item.stid, item.status)}
                                    >
                                        {item.status === 1 ? 'Enabled' : 'Disabled'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </>
    );
}

export default Statemgt;
