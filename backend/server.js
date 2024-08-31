const express = require('express')
const app = express();
const cors = require('cors');
const port = 9679;
const mongoose = require('mongoose');
const config = require('./db');
const cityRoute = require('./Admin/city.route');
const stateRoute = require('./Admin/state.route');
const productRoute = require('./Admin/productcat.route');
const product = require('./product/product.route')
const customerRoute = require('./customer/customer.routes')
const paymentRoute = require('./payment.route');
const venderRoute = require('./vender/vender.route');
const adminRoute = require('./Admin/admin.route');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/city', cityRoute);
app.use('/productcatg', productRoute)
app.use('/state', stateRoute);
app.use('/product', product);
app.use('/customer', customerRoute);
app.use('/payment', paymentRoute);
app.use('/vender', venderRoute);
app.use('/admin', adminRoute)



mongoose.connect(config).then(() => {
    console.log('Connected to database');
}).catch(err => {
    console.log('Database connection error:', err);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
