import React from "react";
import ProductList from '../productviews/productlist'
import ReactDom from 'react-dom/client'
function CustomerHome(props) {
    const handleShoppingButton = () => {
        const root = ReactDom.createRoot(
            document.getElementById('root')
        )
        console.log(props.data)
        var cid = props.data.cid;
        root.render(<ProductList data={cid} />)
    }

    return (
        <div>

            <h1>Customer ID{props.data.cid}</h1>
            <p>welcome to {props.data.cfname}</p>
            <p><img src={`http://localhost:9679/customer/getimage/${props.data.cpicname}`} alt={props.data.cpicname} width={300} height={300} /></p>
            <button onClick={handleShoppingButton}>Shopping</button>

        </div>)
} export default CustomerHome;