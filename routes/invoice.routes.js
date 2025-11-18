
const express = require('express');
const router= require('express');
const{createinvoice} = require('../controllers/invoice.controller.js');
  

router.post("/new-invoice",createinvoice);
module.exports= router;