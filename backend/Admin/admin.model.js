const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    AUSerId: { type: String },
    AUserPass: { type: String },
    AenderName: { type: String },
    AAddress: { type: String },
    AEmail: { type: String },
    AContact: { type: Number },
    APicName: { type: String },
    Aid: { type: Number }
},
    {
        collection: 'Admin'
    }
);

module.exports = mongoose.model('Admin', Admin);
