import axios from "axios";
import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import VenderHome from "./venderHome";

function VenderLogin() {
    const [VUSerId, setVUSerId] = useState("");
    const [VUserPass, setVUserPass] = useState("");

    const handleVUSerId = (evt) => {
        setVUSerId(evt.target.value);
    };

    const handleVUserPass = (evt) => {
        setVUserPass(evt.target.value);
    };

    const handleLoginButton = () => {
        let obj = {
            VUSerId: VUSerId,
            VUserPass: VUserPass
        };
        console.log(obj);

        axios.post('http://localhost:9679/vender/login', obj)
            .then((res) => {
                console.log('Response from server:', res.data);
                if (res.data === 'Invalid ID or password' || res.data === 'Something went wrong') {
                    alert('Invalid ID or password & Login failed');
                } else {
                    alert('Login success');
                    const obj2 = {
                        vfname: res.data.VenderName,
                        vpicname: res.data.VPicName,
                        vid: res.data.Vid

                    };
                    console.log(obj2)
                    const root = ReactDOM.createRoot(document.getElementById('root'));
                    root.render(<VenderHome data={obj2} />);
                }
            })
            .catch((error) => {
                console.error('Error during login:', error);
                alert('An error occurred during login. Please try again.');
            });
    };

    return (
        <div className="container">
            <center>
                <h1>Login</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>VUSerId</td>
                            <td><input type="text" value={VUSerId} onChange={handleVUSerId} /></td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type="password" value={VUserPass} onChange={handleVUserPass} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button onClick={handleLoginButton}>Login</button></td>
                        </tr>
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default VenderLogin;
