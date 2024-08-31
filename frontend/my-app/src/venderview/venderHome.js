import React from "react";
import Product from '../productviews/product'
import ReactDom from 'react-dom/client'
function VenderHome(props) {
    const handleShoppingButton = () => {
        const root = ReactDom.createRoot(
            document.getElementById('root')
        )
        console.log(props.data)
        var vid = props.data.vid;
        root.render(<Product data={vid} />)
    }

    return (
        <div>

            <h1>vender ID{props.data.vid}</h1>
            <p>welcome to {props.data.vfname}</p>
            <p><img src={`http://localhost:9679/vender/getimage/${props.data.vpicname}`} alt={props.data.vpicname} width={300} height={300} /></p>
            <button onClick={handleShoppingButton}>Shopping</button>

        </div>)
} export default VenderHome;