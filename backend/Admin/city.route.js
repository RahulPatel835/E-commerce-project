const express = require('express');
const cityRouter = express.Router();
const City = require('../Admin/city.model');

cityRouter.post('/save', (req, res) => {

    const city = new City(req.body);
    city.save().then(result => {
        res.send('City saved successfully');
    }).catch(err => {
        res.send(err);
    })
});

cityRouter.get('/search/:ctid', (req, res) => {
    City.findOne({ "ctid": req.params.ctid })
        .then(result => res.send(result))
        .catch(err => {
            res.send(err);
        })
})

cityRouter.put('/update', (req, res) => {
    City.updateOne({ "ctid": req.body.ctid }, { "ctid": req.body.ctid, "ctname": req.body.ctname, "stid": req.body.stid, "status": req.body.status })

        .then(result => res.send('city updated successfully'))
        .catch(err => res.send(err));
});

cityRouter.delete('/delete/:ctid', (req, res) => {
    City.updateOne({ "ctid": req.body.ctid }, { "status": 0 }).then(result => {
        res.send('stated disabled succesfully')
    })
});

cityRouter.get('/show', (req, res) => {
    City.find().then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    })
})
cityRouter.put('/toggle', (req, res) => {
    City.updateOne({ "ctid": req.body.ctid }, { "status": req.body.status })
        .then(result => res.send('state updated successfully'))
        .catch(err => res.send(err));
});
cityRouter.get('/searchbyname/:ctname', (req, res) => {

    City.findOne({ "ctname": req.params.ctname })
        .then(result => res.send(result))
        .catch(err => res.send(err));
});
cityRouter.get('/getall', (req, res) => {
    City.find().then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    })
})
cityRouter.get('/showcitybystate/:stid', (req, res) => {
    City.find({ "stid": req.params.stid })
        .then(result => res.send(result))
        .catch(err => res.send(err));
});
module.exports = cityRouter;
