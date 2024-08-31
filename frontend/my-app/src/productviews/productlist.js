import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from '../Card.png';
import ReactDOM from 'react-dom/client';
import Bill from '../customerviews/bills'
import '../index.css';

function ProductList(props) {
    const [itemCount, setItemCount] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [products, setProducts] = useState([]);

    // Fetch product and category lists on component mount
    useEffect(() => {
        axios.get('http://localhost:9679/product/showproduct')
            .then((res) => {
                setProducts(res.data);
            })
            .catch(err => {
                alert(err.message);
            });

        axios.get('http://localhost:9679/productcatg/getall')
            .then((res) => {
                setProductCategories(res.data);
            })
            .catch(err => {
                alert(err.message);
            });
    }, []);

    const handleBuyButton = (productId) => {
        // Find the product to add
        const product = products.find(item => item.pid === productId);

        if (product) {
            setSelectedItems(prevItems => [...prevItems, product]);
            setItemCount(prevCount => prevCount + 1);
        }
    };

    const handleCheckButton = () => {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        const { data: customerId } = props;

        const billData = {
            selectedItems,
            customerId
        };

        root.render(<Bill data={billData} />);
    };

    const getCategoryName = (categoryId) => {
        const category = productCategories.find(citem => citem.pcatgid === categoryId);
        return category ? category.pcatgname : 'Unknown';
    };

    return (
        <>
            <center>
                <h6>Customer ID: {props.data}</h6>
                <div>
                    <img src={Cart} alt="Cart" height={50} width={50} />
                    <label htmlFor="">Items: {itemCount}</label>
                    <button type='button' onClick={handleCheckButton}>Checkout</button>
                </div>
                <div className='mydiv'>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Category Id</th>
                                <th>Category Name</th>
                                <th>Photo</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr key={item.pid}>
                                    <td>{item.pid}</td>
                                    <td>{item.pname}</td>
                                    <td>{item.pprice}</td>
                                    <td>{item.oprice}</td>
                                    <td>{item.pcatgid}</td>
                                    <td>{getCategoryName(item.pcatgid)}</td>
                                    <td>
                                        <img src={`http://localhost:9679/product/getproductimage/${item.ppicname}`} alt="" width={100} height={100} />
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => handleBuyButton(item.pid)}>Buy</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </center>
        </>
    );
}

export default ProductList;
