import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Product(props) {
    const [pid, setPid] = useState('');
    const [pname, setPName] = useState('');
    const [pprice, setPPrice] = useState('');
    const [oprice, setOPrice] = useState('');
    const [ppicname, setPPicName] = useState('');
    const [pcatgid, setPCatgId] = useState('');
    const [pcatgList, setPCatgList] = useState([]);
    const [status, setStatus] = useState('');
    const [image, setImage] = useState({ preview: "", data: "" });
    const [PList, setPList] = useState([]);

    const handlePidText = (evt) => setPid(evt.target.value.toUpperCase());
    const handlePName = (evt) => setPName(evt.target.value);
    const handlePPrice = (evt) => setPPrice(evt.target.value);
    const handleOPrice = (evt) => setOPrice(evt.target.value);
    const handlePCatgSelect = (evt) => setPCatgId(evt.target.value);

    useEffect(() => {
        axios.get('http://localhost:9679/product/getmaxpid')
            .then((res) => {
                setPid(res.data.length + 1);
            })
            .catch(err => {
                alert(err.message);
            });

        axios.get('http://localhost:9679/productcatg/getall')
            .then((res) => {
                setPCatgList(res.data);
            })
            .catch(err => {
                alert(err.message);
            });
    }, []);

    const handleSaveButton = () => {
        if (!pid || !pname) {
            alert("Please fill all fields");
            return;
        }

        const obj = {
            pid: pid,
            pname: pname,
            pprice: pprice,
            oprice: oprice,
            ppicname: ppicname,
            pcatgid: pcatgid,
            vid: props.data
        };

        axios.post('http://localhost:9679/product/saveproduct', obj)
            .then((res) => {
                alert(res.data);
                console.log(res.data);
                setPid('');
                setPName('');
                setPPrice('');
                setOPrice('');
                setPCatgId('');
                setPPicName('');
                handleShowButton();
            })
            .catch(err => {
                alert(err.message);
            });
    }

    const handleShowButton = () => {
        axios.get('http://localhost:9679/product/showproduct')
            .then((res) => {
                setPList(res.data);
                console.log(res.data);
            })
            .catch(err => {
                alert(err.message);
            });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let formData = new FormData();
        formData.append('file', image.data);
        const response = await fetch('http://localhost:9679/product/saveproductimages', {
            method: 'POST',
            body: formData,
        });
        const result = await response.json();
        if (response.ok) {
            setStatus('File uploaded successfully');
        } else {
            setStatus('Failed to upload file');
        }
    }

    const handleFileChange = (evt) => {
        const img = {
            preview: URL.createObjectURL(evt.target.files[0]),
            data: evt.target.files[0]
        }
        setImage(img);
        setPPicName(evt.target.files[0].name);
    }
    const handleNewButton = () => {
        axios.get('http://localhost:9679/product/getmaxpid')
            .then((res) => {
                setPid(res.data.length + 1);
            })
            .catch(err => {
                alert(err.message);
            });
        setPName('');
        setOPrice('');
        setPCatgId('');
        setPPrice('');
        setPPicName('');
        setImage({ preview: '', data: '' });


    }
    const handleSearchButton = () => {
        if (pname !== undefined && pname !== "") {
            axios.get(`http://localhost:9679/product/search/${pname}`)
                .then(res => {
                    const product = res.data;
                    if (product) {
                        setPid(product.pid);
                        setPName(product.pname);
                        setPPrice(product.pprice);
                        setOPrice(product.oprice);
                        setPCatgId(product.pcatgid);
                        setPPicName(product.ppicname);
                        setImage({
                            preview: `http://localhost:9679/product/getproductimage/${product.ppicname}`,
                            data: image.data
                        });
                    } else {
                        alert("Product Name not found");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    const handleUpdateButton = async () => {
        if (!pid) {
            alert("Please provide a Product ID");
            return;
        }
        const updatedProduct = {
            pid,
            pname,
            pprice,
            oprice,
            pcatgid
        };
        axios.put('http://localhost:9679/product/update', updatedProduct).then((res) => {
            alert("Product Updated Successfully");
            handleShowButton();
            setPid('');
            setPName('');
            setOPrice('');
            setPPicName('');
            setImage({ preview: '', data: '' });
            setPPrice('');
            setPCatgId('');

        }).catch(err => {
            console.log(err);
        })

    };

    const handlegetVenderButton = () => {
        axios.get(`http://localhost:9679/product/getallvenderproduct/${props.data}`)
            .then((res) => {
                setPList(res.data);
                console.log(res.data);
            })
            .catch(err => {
                alert(err.message);
            });
    };


    return (
        <>
            <center>
                <h6>Product Form</h6>
                <div className='mydiv'>
                    <form>
                        <table>
                            <h4>Vender ID : {props.data}</h4>
                            <tbody>
                                <tr>
                                    <td>Product Id</td>
                                    <td>{pid}</td>
                                </tr>
                                <tr>
                                    <td>Product Name</td>
                                    <td>
                                        <input
                                            type="text"
                                            onChange={handlePName}
                                            className='form-control'
                                            value={pname}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>
                                        <input
                                            type="text"
                                            onChange={handlePPrice}
                                            className='form-control'
                                            value={pprice}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Offer Price</td>
                                    <td>
                                        <input
                                            type="text"
                                            onChange={handleOPrice}
                                            className='form-control'
                                            value={oprice}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Select Photo</td>
                                    <td>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            className='form-control'
                                            name="file" />
                                        <img src={image.preview} width={100} height={100} alt="Preview" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Click to Upload Product Photo</td>
                                    <td>
                                        <button type="button" onClick={handleSubmit}>Upload</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Category</td>
                                    <td>
                                        <select onChange={handlePCatgSelect}>
                                            <option value="" disabled>select catagary</option>
                                            {pcatgList.map((item) => (
                                                <option value={item.pcatgid} key={item.pcatgid}>{item.pcatgname}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button type='button'
                                            onClick={handleNewButton}
                                            className='btn btn-outline-success'>New</button>
                                    </td>
                                    <td>
                                        <button type='button'
                                            onClick={handleSearchButton}
                                            className='btn btn-outline-success'>Search</button>
                                    </td>
                                    <td>
                                        <button
                                            type='button'
                                            onClick={handleUpdateButton}
                                            className='btn btn-outline-warning'
                                        >
                                            Update
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            type='button'
                                            onClick={handleSaveButton}
                                            className='btn btn-outline-success'
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
                                            onClick={handlegetVenderButton}
                                            className='btn btn-outline-success'
                                        >
                                            VenderItemShow
                                        </button>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </center>
            <center className='Centre2'>
                <h6>Product List</h6>
                <table className='table2'>
                    <thead>
                        <tr className='tr'>
                            <th className='thead'>Product ID</th>
                            <th className='thead'>Product Name</th>
                            <th className='thead'>Price</th>
                            <th className='thead'>Offer Price</th>
                            <th className='thead'>Category Name</th>
                            <th className='thead'>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {PList.map((product, index) => (
                            <tr key={index}>
                                <td>{product.pid}</td>
                                <td>{product.pname}</td>
                                <td>{product.pprice}</td>
                                <td>{product.oprice}</td>
                                <td>
                                    {pcatgList.find(item => item.pcatgid === product.pcatgid)?.pcatgname || 'Unknown'}
                                </td>
                                <td>
                                    <img src={`http://localhost:9679/product/getproductimage/${product.ppicname}`} alt="" width={100} height={100} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
        </>
    );
}

export default Product;
