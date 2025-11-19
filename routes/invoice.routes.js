
const express = require('express');
const router = express.Router();
const{createinvoice,listinvoice,deleteInvoice,updateinvoice} = require('../controller/invoice.controller.js');
  

router.post("/new-invoice",createinvoice);
router.get("/list-invoice",listinvoice);
router.delete("/delete-invoice/:invoiceNumber/:finicialyear",deleteInvoice);
router.put("/update-invoice/:id",updateinvoice);
module.exports= router;