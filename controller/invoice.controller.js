
const invoicemodel = require("../model/invoice.model");
exports.createinvoice =  async (req,res)=>{
    try{        
        const invoicedata = req.body;
        if(!invoicedata.invoiceNumber || !invoicedata.invoicedate || !invoicedata.invoiceammount || !invoicedata.finicialyear){
            res.json({message:"all fileds are mandetory"});
            return;

        }
        await invoicemodel.collection.insertOne(invoicedata);
        res.json({message:" invoice add to database successfully"});
    }catch(err){
        res.json({message:err.message});
    }
}