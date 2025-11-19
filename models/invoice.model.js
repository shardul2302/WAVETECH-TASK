const mongoose = require('mongoose');
const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: Number,
        
        
        
    },
    invoicedate: {
        type: Date,
          
    },
    invoiceammount: {
        type: Number,
        
    },
    finicialyear: {
        type: String,
       
        
    }
}
);

module.exports = mongoose.model('Invoice', invoiceSchema);
