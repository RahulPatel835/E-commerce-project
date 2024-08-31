import React, { useEffect, useState } from 'react';
import axios from 'axios'
import logo from '../Image/logo.avif'
function Bill(props) {
    const [mydate, setDate] = useState();
    const [custdata, setcustData] = useState();
    const [Cname, setCName] = useState();
    const [Caddress, setCAddress] = useState();
    const [CConatct, setCConatct] = useState();
    const [sitems, setitems] = useState([]);
    var total = 0;
    useEffect(() => {
        setitems(...props.data.selectedItems);
        var cid = props.data.customerId;
        axios.get('http://localhost:9679/customer/getcustomerdeatils/' + cid).then(res => {
            setCName(res.data.CustomerName);
            setCAddress(res.data.CAddress);
            setCConatct(res.data.CConatct);
            MydateFun();
        }).catch(err => {
            console.log(err);
        })
    }, []);
    function MydateFun() {
        var today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let Year = today.getFullYear();
        let currentDate = `${day}-${month}-${Year}`;
        setDate(currentDate);
    }
    function refreshPage() {
        window.location.reload(false);
    }
    const handleRemoveButton = (pid) => {

    }
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                reject(false)
            }
            document.body.appendChild(script);
        })
    }
    async function displayRazorpay() {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        try {
            var amt = total * 100;
            const result = await axios.post('http://localhost:9679/payment/orders/' + amt);
            const { amount, id: order_id, currency } = result.data;

            const options = {
                key: 'rzp_test_8CxHBNuMQt1Qn8',

                amount: amount.toString(),
                currency: currency,
                name: 'Test',
                description: 'Test',
                image: logo,
                handler: async function (response) {
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature
                    };
                    try {
                        await axios.post('http://localhost:9679/payment/success', data);
                        alert('Payment successfully done');
                    } catch (error) {
                        alert('Error processing payment');
                        console.error(error);
                    }
                },
                prefill: {
                    name: 'Test',
                    email: 'demo@gmail.com',
                    contact: '1234567890'
                },
                theme: {
                    primaryColor: '#3399cc'
                },
                notes: {
                    acno: 7906000100000000000,
                    address: "purani gali ke piche"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            alert('Server error. Are you online?');
            console.error(error);
        }
    }



    return (
        <div>
            <table>
                <tr>
                    <td>Customer Id</td>
                    <td>{props.data.customerId}</td>
                </tr>
                <tr>
                    <td>Customer Name</td>
                    <td>{Cname}</td>
                </tr>
                <tr>
                    <td>
                        address
                    </td>
                    <td>
                        {Caddress}
                    </td>
                </tr>
                <tr>
                    <td>
                        Conatct
                    </td>
                    <td>
                        {CConatct}
                    </td>
                </tr>
                <tr>
                    <td>bill Date </td>
                    <td>{mydate}</td>
                </tr>
            </table>
            <center>
                <h4>Bills</h4>
                <table border={1}>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Photo</th>
                    </tr>
                    {
                        props.data.selectedItems.map((bill, index) => (
                            <tr key={index}>
                                <td>{bill.pid}</td>
                                <td>{bill.pname}</td>
                                <td>{bill.oprice}</td>
                                <img src={"http://localhost:9679/product/getproductimage/" + bill.ppicname} alt="" height={50} width={50} />
                            </tr>
                        )
                        )
                    }


                </table>
                {
                    props.data.selectedItems.map((item) => {
                        total = total + item.oprice;
                    })
                }
                <h4>Total Amount ={total} </h4>
                <button type='submit' onClick={displayRazorpay}>Pay Now</button>
            </center>
        </div>
    )
}
export default Bill;

//
// npm install razorpay  --save library provides payemnets  gateway,is used tp implenet online paymnet functionality
// import React, { useEffect, useState } from "react";
// import axios from "axios";


// function Bill(props) {
//     const [mydate, setMydate] = useState();
//     const [custdata, setcusdata] = useState();
//     const [cname, setcname] = useState();
//     const [caddress, setcaddress] = useState();
//     const [ccontact, setccontact] = useState();
//     const [sitems, setsitems] = useState([]);
//     var total = 0;

//     useEffect(() => {
//         for (var i = 0; i < props.data.selitems.length; i++) {
//             sitems.push(props.data.selitems[i]);
//         }
//         sitems.push(props.data.selitems);

//         axios.get("http://localhost:9191/customer/getcustomerdetails/" + props.data.cid).then((res) => {
//             setcname(res.data.customername);
//             setcaddress(res.data.caddress);
//             setccontact(res.data.ccontact);
//             mydateFun();
//         }).catch((err) => {
//             alert(err);
//         })
//     }, []);

//     function mydateFun() {
//         const date = new Date();
//         let day = date.getDate();
//         let month = date.getMonth() + 1;
//         let year = date.getFullYear();
//         let currendata = ${ day }-${ month } -${ year };
//         setMydate(currendata);
//     }
//     function refreshpage() {
//         window.location.reload(false);
//     }

//     const handleRemoveButton = (pid) => {
//         alert("selected item will remove from cart" + pid)
//         for (var i = 0; i < sitems.length; i++) {
//             if (sitems[i].pid == pid) {
//                 sitems.splice(i, 1);
//             }
//         }
//     }

//     function loadscript(src) {
//         return new Promise((resolve) => {
//             const script = document.createElement("script");
//             script.src = src;
//             script.onload = () => {
//                 resolve(true);
//             };
//             script.onerror = () => {
//                 resolve(false);
//             };
//             document.body.appendChild(script);
//         });
//     }

//     async function displayRazorypay() {
//         const res = await loadscript(
//             "https://checkout.razorpay.com/v1/checkout.js"
//         );
//         if (!res) {
//             alert("razorpay sdk failed to load are you online");
//             return;
//         }
//         var myamount = total * 100;
//         //   creatin a new order
//         const result = await axios.post("http://localhost:9191/payment/orders/" + myamount);
//         if (!result) {
//             alert("server error are you online?");
//             return;
//         }
//         //  getting the order details back
//         const { amount, id: order_id, currency } = result.data;

//         const options = {
//             key: "rzp_test_8CxHBNuMQt1Qn8",//enter the key id generated from  the dashbord
//             amount: amount.toString(),
//             currency: currency,
//             name: "universal informatics Pvt.ltd.indore",
//             description: "test transaction ",
//             // image:{logo},
//             order_id: order_id,
//             handler: async function (response) {
//                 const data = {
//                     orderCreationId: order_id,
//                     razorpayPaymentId: response.razorpay_payment_id,
//                     razorpayOrderId: response.razorpay_order_id,
//                     razorpaySignature: response.razorpay_signature,
//                 };
//                 alert(data.razorpayPaymentId)
//                 const result = await axios.post("http://localhost:9191/payment/success", data);
//                 alert(result.data);
//             },
//             prefille: {
//                 name: "universal informatics",
//                 email: "universal@gmail.com",
//                 contact: 7895526655,
//             },
//             notes: {
//                 address: " universal informatics indore pvt  ltd",
//             },
//             theme: {
//                 color: "#61dafb",
//             },
//         }
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//     }

//     return (
//         <div>
//             <table>
//                 <tr>
//                     <td>Customer id</td>
//                     <td>{props.data.cid}</td>
//                 </tr>

//                 <tr>
//                     <td>Customer name</td>
//                     <td>{cname}</td>
//                 </tr>

//                 <tr>
//                     <td>address</td>
//                     <td>{caddress}</td>
//                 </tr>

//                 <tr>
//                     <td>Contact </td>
//                     <td>
//                         {ccontact}
//                     </td>
//                 </tr>
//                 <tr>
//                     <td>Bill Date</td>
//                     <td>
//                         {mydate}
//                     </td>
//                 </tr>
//             </table>

//             <center>
//                 <h4 style={{ backgroundcolor: "green" }}>Bill</h4>
//                 <table border="1">
//                     <tr>
//                         <th>id</th>
//                         <th>product name</th>
//                         <th>price</th>
//                         <th>Photo</th>
//                     </tr>
//                     {
//                         props.data.selitems.map((item) => (
//                             <tr>
//                                 <td>{item.pid}</td>
//                                 <td>{item.pname}</td>
//                                 <td>{item.oprice}</td>
//                                 <img src={"http://localhost:9191/product/getproductimage/" + item.ppicname} height={50} width={50} />
//                             </tr>
//                         ))
//                     }
//                 </table>
//                 {
//                     props.data.selitems.map((item) => {
//                         total = total + item.oprice;
//                     })
//                 }
//                 <h4 style={{ backgroundColor: "grren" }}>Total Amount {total}</h4>
//                 <button type=" submit" onClick={displayRazorypay}>pay now </button>
//             </center>
//         </div>
//     );
// } export default Bill;