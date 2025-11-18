
const mongoose = require('mongoose');
const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    invoicedate: {
        type: Date,
        required: true      
    },
    invoiceammount: {
        type: Number,
        required: true
    },
    finicialyear: {
        type: String,
        required: true,
         unique: true
    }
}
);

module.exports = mongoose.model('Invoice', invoiceSchema);
