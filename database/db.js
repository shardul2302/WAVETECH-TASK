const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const coonectiondb = async () => {
     await mongoose.connect(process.env.MONGO_STRING).then(()=>{
    console.log('connected db');
}).catch((err)=>{
    console.log(err)
})
}


// 
module.exports = coonectiondb;
