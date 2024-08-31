import React, { useState } from 'react';
import axios from 'axios';
import '../index.css';

function Productmgt() {
    const [pcatgid, setProductId] = useState('');
    const [pcatgname, setpcatgName] = useState('');

    const [stPList, setStPList] = useState([]);

    const handlepcatgname = (evt) => setpcatgName(evt.target.value.toUpperCase());
    const handleproductid = (evt) => setProductId(evt.target.value);

    // Fetch state list on component mount
    // useEffect(() => {
    //     axios.get('http://localhost:9679/productcatg/getall')
    //         .then((res) => {
    //             setStPList(res.data);
    //         })
    //         .catch(err => {
    //             alert(err.message);
    //         });
    // }, []); // Empty dependency array ensures this runs only on mount

    const handleSaveButton = () => {
        if (!pcatgid || !pcatgname) {
            alert("Please fill all fields");
            return;
        }

        const obj = { pcatgid, pcatgname };
        axios.post('http://localhost:9679/product/save', obj)
            .then((res) => {
                alert(res.data);
                console.log(res.data)
                setProductId('');
                setpcatgName('');
                handleShowButton();
            })
            .catch(err => {
                alert(err.message);
            });
    }



    const handleShowButton = () => {
        axios.get('http://localhost:9679/productcatg/getall')
            .then((res) => {
                setStPList(res.data);
                console.log(res.data)
            })
            .catch(err => {
                alert(err.message);
            });
    };

    return (
        <>
            <center>
                <h6>Product category</h6>
                <div className='mydiv'>
                    <table>
                        <tbody>
                            <tr>
                                <td>product Id</td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={handleproductid}
                                        className='form-control'
                                        value={pcatgid}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>product Name</td>
                                <td>
                                    <input
                                        type="text"
                                        onChange={handlepcatgname}
                                        className='form-control'
                                        value={pcatgname}
                                    />
                                </td>
                            </tr>

                            <tr>

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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </center>
            <center className='Centre2'>
                <h6>product List</h6>
                <table className='table2'>
                    <thead>
                        <tr className='tr'>
                            <th className='thead'>product ID</th>
                            <th className='thead'>product Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stPList.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.pcatgid}</td>
                                    <td>{product.pcatgname}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </center>
        </>
    );
}

export default Productmgt;


