const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('./product.model');
const productRoute = express.Router();

// Create a multer storage instance
const stv = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'F:/e-commerce/backend/product/productimages');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploads = multer({ storage: stv });

productRoute.post('/saveproduct', (req, res) => {
    const product = new Product(req.body);
    product.save()
        .then(result => {
            res.send(`Product saved successfully: ${result}`);
        })
        .catch(err => {
            res.send(err);
        });
});

// Route to show all products
productRoute.get('/showproduct', (req, res) => {
    Product.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err.message);
        });
});
//Route to show all vender item 
productRoute.get('/getallvenderproduct/:vid', (req, res) => {
    const vid = req.params.vid;
    Product.find({ "vid": vid })
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err.message);
        });
});

// Route to get the product image
productRoute.get('/getproductimage/:Picname', (req, res) => {
    const picName = req.params.Picname;
    const filePath = path.join(__dirname, 'productimages', picName);
    res.sendFile(filePath, err => {
        if (err) {
            res.status(404).send({ error: 'File not found' });
        }
    });
});

// Route to save product images
productRoute.post('/saveproductimages', uploads.single('file'), (req, res) => {
    if (!req.file) {
        return res.send('No file uploaded');
    }
    res.json({ message: 'File uploaded successfully', file: req.file });
});

// Route to get max product ID
productRoute.get('/getmaxpid', (req, res) => {
    Product.find().then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    });
});
productRoute.get('/search/:pname', (req, res) => {
    Product.findOne({ "pname": req.params.pname })
        .then(result => res.send(result))
        .catch(err => {
            res.send(err);
        })
})

// Route to update a product by ID
productRoute.put('/update', (req, res) => {
    Product.updateOne({ "pid": req.body.pid },
        {
            "pid": req.body.pid, "pname": req.body.pname,
            "pprice": req.body.pprice, "oprice": req.body.oprice,
            "ppicname": req.body.ppicname, "pcatgid": req.body.pcatgid
        })
        .then(result => res.send('state updated successfully'))
        .catch(err => res.send(err));
});


module.exports = productRoute;