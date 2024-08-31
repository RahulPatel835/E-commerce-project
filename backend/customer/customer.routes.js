const express = require('express');
const customerRoute = express.Router();
const bodyparser = require('body-parser');
const Customer = require('./customer.model');
const fs = require('fs');
const multer = require('multer');

customerRoute.post('/regsiter', (req, res) => {
    const customer = new Customer(req.body);
    customer.save().then(cust => {
        if (cust != null) {
            res.send('regsistration succesfully');
        } else {
            res.send('regsistration failed');

        }
    })
})

customerRoute.post('/login', (req, res) => {
    const id = req.body.CUSerId;
    const password = req.body.CUserPass;


    Customer.findOne({ CUSerId: id, CUserPass: password, CStatus: 'active' })
        .then(cust => {
            if (cust) {
                res.send(cust);
            } else {
                res.send('Invalid ID or password');
            }
        })
        .catch(err => {
            console.error(err);
            res.send('Something went wrong');
        });
});

customerRoute.get('/getimage/:cpicname', (req, res) => {
    const picname = req.params.cpicname;
    res.sendFile("F:/e-commerce/backend/customer/customerimages/" + picname)
})

const stv = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'F:/e-commerce/backend/customer/customerimages');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploads = multer({ storage: stv });

customerRoute.post('/savecustomerimage', uploads.single('file'), (req, res) => {
    res.send("file upload successfully ");
})
customerRoute.get('/getcustomercount', (req, res) => {
    Customer.find().then(customer => {
        res.send(customer);
    }).catch(err => {
        res.send(err);
    })
})
customerRoute.get('/getcustomerdeatils/:cid', (req, res) => {
    const id = req.params.cid;
    console.log(id);
    Customer.findOne({ "Cid": id }).then(customer => {
        // console.log(customer)
        res.send(customer);
    }).catch(err => {
        res.send(err);
    })
})
customerRoute.put('/toggle', (req, res) => {
    const { Cid, CStatus } = req.body;

    Customer.updateOne({ "Cid": Cid }, { "CStatus": CStatus })
        .then(result => {
            console.log('Update result:', result);
            res.send('State updated successfully');
        })
        .catch(err => {
            console.error('Update error:', err);
            res.status(500).send(err);
        });
});

module.exports = customerRoute;
