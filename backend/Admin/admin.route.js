const express = require('express');
const adminRoute = express.Router();
const bodyparser = require('body-parser');
const Admin = require('./admin.model');
const fs = require('fs');
const multer = require('multer');

adminRoute.post('/regsiter', (req, res) => {
    const admin = new Admin(req.body);
    admin.save().then(cust => {
        if (cust != null) {
            res.send('regsistration succesfully');
        } else {
            res.send('regsistration failed');

        }
    })
})

adminRoute.post('/login', (req, res) => {
    const id = req.body.AUSerId;
    const password = req.body.AUserPass;


    Admin.findOne({ AUSerId: id, AUserPass: password })
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

adminRoute.get('/getimage/:Apicname', (req, res) => {
    const picname = req.params.Apicname;
    res.sendFile("F:/e-commerce/backend/admin/adminimages/" + picname)
})

const stv = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'F:/e-commerce/backend/admin/adminimages');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploads = multer({ storage: stv });

adminRoute.post('/saveadminimage', uploads.single('file'), (req, res) => {
    res.send("file upload successfully ");
})
adminRoute.get('/getadmincount', (req, res) => {
    Admin.find().then(admin => {
        res.send(admin);
    }).catch(err => {
        res.send(err);
    })
})
adminRoute.get('/getadmindeatils/:Aid', (req, res) => {
    const id = req.params.Aid;
    console.log(id);
    Admin.findOne({ "Aid": id }).then(admin => {
        // console.log(admin)
        res.send(admin);
    }).catch(err => {
        res.send(err);
    })
})
module.exports = adminRoute;
