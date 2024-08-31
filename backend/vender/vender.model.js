const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Vender = new Schema({
    VUSerId: { type: String },
    VUserPass: { type: String },
    VenderName: { type: String },
    VAddress: { type: String },
    VEmail: { type: String },
    VContact: { type: Number },
    VPicName: { type: String },
    Vid: { type: Number },
    VStatus: { type: String }

},
    {
        collection: 'Vender'
    }
);

module.exports = mongoose.model('Vender', Vender);
