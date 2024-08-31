import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDom from 'react-dom/client'
// import './Vender.css';

function VenderReg() {
    const [VUSerId, setVUSerId] = useState("");
    const [VUserPass, setVUserPass] = useState("");
    const [VenderName, setVenderName] = useState("");
    const [VAddress, setVAddress] = useState("");
    const [VEmail, setVEmail] = useState("");
    const [VContact, setVContact] = useState("");
    const [VPicName, setVPicName] = useState("");
    const [Vid, setVid] = useState("");
    const [status, setstatus] = useState('');
    const [image, setImage] = useState({ preview: '', data: '' });

    const handleVUSerId = (evt) => {
        setVUSerId(evt.target.value);
    }
    const handleUserP = (evt) => {
        setVUserPass(evt.target.value);
    }
    const handleVenderName = (evt) => {
        setVenderName(evt.target.value);
    }
    const handleVAddress = (evt) => {
        setVAddress(evt.target.value);
    }
    const handleVEmail = (evt) => {
        setVEmail(evt.target.value);
    }
    const handleVContact = (evt) => {
        setVContact(evt.target.value);
    }

    const handlePicName = (evt) => {
        setVPicName(evt.target.value);
    }
    useEffect(() => {
        axios.get('http://localhost:9679/vender/getvendercount').then((res) => {
            setVid(res.data.length + 1);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    const handleRegsistration = async () => {
        var obj = {
            VUSerId: VUSerId,
            VUserPass: VUserPass,
            VenderName: VenderName,
            VAddress: VAddress,
            VEmail: VEmail,
            VContact: VContact,
            VPicName: VPicName,
            Vid: Vid,
            VStatus: 0
        }
        console.log(obj)
        const formData = new FormData();
        formData.append('file', image.data);
        const res = await fetch('http://localhost:9679/vender/savevenderimage', {
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
        axios.post('http://localhost:9679/vender/regsiter', obj).then(res => {
            console.log(res.data);
            if (res.data === 'regsistration succesfully') {
                setVenderName('');
                setVUSerId('');
                setVUserPass('');
                setVAddress('');
                setVEmail('');
                setVContact('');
                setVPicName('');
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
        setVPicName(evt.target.files[0].name);
    };

    return (
        <div className="container">
            <h1>Vender Register</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Vender ID:</td>
                        <td>{Vid}</td>
                    </tr>
                    <tr>
                        <td>User Id</td>
                        <td><input type="text" value={VUSerId} onChange={handleVUSerId} /></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" value={VUserPass} onChange={handleUserP} /></td>
                    </tr>
                    <tr>
                        <td>Full Name</td>
                        <td><input type="text" value={VenderName} onChange={handleVenderName} /></td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>
                            <input type="text" onChange={handleVAddress} value={VAddress} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email
                        </td>
                        <td>
                            <input type="text" onChange={handleVEmail} value={VEmail} />
                        </td>

                    </tr>
                    <tr>
                        <td>
                            Phone
                        </td>
                        <td>
                            <input type="text" onChange={handleVContact} value={VContact} />
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
export default VenderReg;
