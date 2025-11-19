
const invoicemodel = require("../models/invoice.model");
exports.createinvoice =  async (req,res)=>{
    try{        
        const invoicedata = req.body;
        const { invoiceNumber, invoicedate, invoiceammount, finicialyear } = req.body;
          console.log("BODY RECEIVED: ", req.body);  
          console.log("invoiceNumber: ", invoiceNumber);  
        if(!invoiceNumber || !invoicedate || !invoiceammount || !finicialyear){
            res.json({message:"all fileds are mandetory"});
            return;

        }
     const exists = await invoicemodel.findOne({ invoiceNumber, finicialyear });
    if (exists) {
      return res.status(400).json({ message: "Invoice number already exists in this financial year" });
    }
//    const invoicedata = {
//       invoiceNumber,
//       invoicedate: new Date(invoicedate),
//       invoiceammount,
//       finicialyear
//     };


        await invoicemodel.collection.insertOne(invoicedata);
        res.json({message:" invoice add to database successfully"});
    }catch(err){
        res.json({message:err.message});
    }
}

exports.listinvoice =  async (req,res)=>{
   try{
   const invoicelist =    await  invoicemodel.find();
   res.json({invoicelist})
   }catch(err){
        res.json({message:err.message});
   }
}

exports.deleteInvoice = async (req, res) => {
    try {
        const { invoiceNumber, finicialyear} = req.params;  
        const deletedinvoice = await invoicemodel.findOneAndDelete({ 
            invoiceNumber,
             finicialyear
            });
        if (!deletedinvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }           
        res.json({ message: "Invoice deleted successfully" });
    } catch (err) {
        res.json({ message: err.message });
    }
};

exports.updateinvoice =  async (req,res)=>{
    try{    
        //  const {invoicedate,invoiceammount  } = req.params;
        const {id} = req.params;
        const {invoicedate,invoiceammount} =req.body;
         const updateddata = req.body;
         if(!invoicedate || !invoiceammount){
            res.json("invoicedate and invoiceammount is mandetory");
            return;
         }
        await invoicemodel.findByIdAndUpdate(id, updateddata);
         
             return  res.json({message:"invoice  updated correctly"});
    }catch(err){
             res.json({message:err.message})
           }
};
