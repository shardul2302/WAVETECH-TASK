
const mongoose = require('mongoose');
const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: Number,
        required: true,
        
        
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
        required: true
        
    }
}
);

module.exports = mongoose.model('Invoice', invoiceSchema);
