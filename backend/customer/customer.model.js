const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
    CUSerId: { type: String },
    CUserPass: { type: String },
    CustomerName: { type: String },
    StId: { type: Number },
    CtId: { type: Number },
    CAddress: { type: String },
    CEmail: { type: String },
    CConatct: { type: Number },
    CPicName: { type: String },
    Cid: { type: Number },
    CStatus: { type: String }

},
    {
        collection: 'customer'
    }
);

module.exports = mongoose.model('Customer', Customer);
