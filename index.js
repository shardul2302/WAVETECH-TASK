
const express = require('express')
const dotenv = require('dotenv');
const coonectiondb1 = require('./database/db.js');
dotenv.config();  
const mongoose= require('mongoose');
const app = express()
const port = 3000
const router  = require('./routes/invoice.routes.js');

app.use(express.json());

app.use(router);






coonectiondb1();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


