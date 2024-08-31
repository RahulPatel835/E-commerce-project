const express = require('express');
const stateRouter = express.Router();
const State = require('../Admin/state.model');


stateRouter.post('/save', (req, res) => {
    const state = new State(req.body);
    state.save()
        .then((state) => {
            res.send('Stated Saved');
        })
        .catch(err => {
            res.send(err);
        })

});

stateRouter.get('/search/:stid', (req, res) => {
    State.findOne({ stid: req.params.stid })
        .then(state => {
            if (state.status == 1) {
                res.send(state);
            } else {
                res.send('State not found');
            }
        })
        .catch(err => {
            res.send(err);
        });
});


stateRouter.put('/update', (req, res) => {
    State.updateOne({ "stid": req.body.stid }, { "stid": req.body.stid, "stname": req.body.stname, "status": req.body.status })
        .then(result => res.send('state updated successfully'))
        .catch(err => res.send(err));
});

stateRouter.delete('/delete/:stid', (req, res) => {
    State.updateOne({ "stid": req.params.stid }, { "status": 0 }).then(result => {
        res.send('stated disabled succesfully')
    })
});

stateRouter.get('/show', (req, res) => {
    State.find({ "status": 1 }).then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    })
})
stateRouter.get('/getall', (req, res) => {
    State.find().then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    })
})

stateRouter.get('/searchbyname/:stname', (req, res) => {

    State.findOne({ "stname": req.params.stname.toUpperCase() })
        .then(result => res.send(result))
        .catch(err => res.send(err));
});
stateRouter.put('/toggle', (req, res) => {
    State.updateOne({ "stid": req.body.stid }, { "status": req.body.status })
        .then(result => res.send('state updated successfully'))
        .catch(err => res.send(err));
});

module.exports = stateRouter;
