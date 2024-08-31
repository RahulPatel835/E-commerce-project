import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDom from 'react-dom/client'
// import './Vender.css';

function AdminReg() {
    const [AUSerId, setAUSerId] = useState("");
    const [AUserPass, setAUserPass] = useState("");
    const [AdminName, setAdminName] = useState("");
    const [AAddress, setAAddress] = useState("");
    const [AEmail, setAEmail] = useState("");
    const [AContact, setAContact] = useState("");
    const [APicName, setAPicName] = useState("");
    const [Aid, setAid] = useState("");
    const [status, setstatus] = useState('');
    const [image, setImage] = useState({ preview: '', data: '' });

    const handleAUSerId = (evt) => {
        setAUSerId(evt.target.value);
    }
    const handleUserP = (evt) => {
        setAUserPass(evt.target.value);
    }
    const handleAdminName = (evt) => {
        setAdminName(evt.target.value);
    }
    const handleAAddress = (evt) => {
        setAAddress(evt.target.value);
    }
    const handleAEmail = (evt) => {
        setAEmail(evt.target.value);
    }
    const handleAContact = (evt) => {
        setAContact(evt.target.value);
    }

    const handlePicName = (evt) => {
        setAPicName(evt.target.value);
    }
    useEffect(() => {
        axios.get('http://localhost:9679/admin/getAdmincount').then((res) => {
            setAid(res.data.length + 1);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    const handleRegsistration = async () => {
        var obj = {
            AUSerId: AUSerId,
            AUserPass: AUserPass,
            AdminName: AdminName,
            AAddress: AAddress,
            AEmail: AEmail,
            AContact: AContact,
            APicName: APicName,
            Aid: Aid
        }
        console.log(obj)
        const formData = new FormData();
        formData.append('file', image.data);
        const res = await fetch('http://localhost:9679/admin/saveAdminimage', {
            method: 'POST',
            body: formData
        });
        if (res) {
            if (res.statusText === 'ok') {
                setstatus('FIle uploads succsefully')
                console.log('upload succfully')
            }
            else {
                setstatus('FIle uploads failed')
            }
        }
        axios.post('http://localhost:9679/admin/regsiter', obj).then(res => {
            console.log(res.data);
            if (res.data === 'regsistration succesfully') {
                setAdminName('');
                setAUSerId('');
                setAUserPass('');
                setAAddress('');
                setAEmail('');
                setAContact('');
                setAPicName('');
                setImage({ preview: '', data: '' });
            }

        }).catch(err => {
            console.log(err);
        })


    }
    const handleChange = (evt) => {
        const selectedFile = evt.target.files[0];
        const imageURL = URL.createObjectURL(selectedFile);
        setImage({ preview: imageURL, data: selectedFile });
        setAPicName(evt.target.files[0].name);
    };

    return (
        <div className="container">
            <h1>Admin Register</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Admin ID:</td>
                        <td>{Aid}</td>
                    </tr>
                    <tr>
                        <td>AUser Id</td>
                        <td><input type="text" value={AUSerId} onChange={handleAUSerId} /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" value={AUserPass} onChange={handleUserP} /></td>
                    </tr>
                    <tr>
                        <td>Full Name</td>
                        <td><input type="text" value={AdminName} onChange={handleAdminName} /></td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>
                            <input type="text" onChange={handleAAddress} value={AAddress} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email
                        </td>
                        <td>
                            <input type="text" onChange={handleAEmail} value={AEmail} />
                        </td>

                    </tr>
                    <tr>
                        <td>
                            Phone
                        </td>
                        <td>
                            <input type="text" onChange={handleAContact} value={AContact} />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2">
                            {image.preview && <img src={image.preview} alt="preview" width={100} height={100} />}
                            <input type="file" onChange={handleChange} name='file' />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <button type="submit" onClick={handleRegsistration} className='btn btn-primary'>Register</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    );

}
export default AdminReg;
