const express=require('express'),
router=express.Router();
const Contact = require('../models/contacts');

// retrieving data
router.get('/contacts',(req,res,next)=>{
    Contact.find((err,contact)=>{
        res.json(contact);
    });
});

// add Data
router.post('/contacts',(req,res,next)=>{
    let newContact=new Contact({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:parseInt(req.body.phone)
    });

    newContact.save((err,contact)=>{
        if(err){
            res.json({msg:"Failed to add contact"})
        }
        else{
            res.json({msg:"Contact added successfully"});
        }
    });

});

// updateData
router.put('/contacts/:id',(req,res,next)=>{
    let upContact={
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:parseInt(req.body.phone)
    };
    Contact.findOneAndUpdate({_id:req.params.id},upContact,{upsert:true},(err,contact) => {
        if(err){
            res.json({msg:"Failed to update contact"})
        }
        else{
            res.json({msg:"Contact updates successfully"});
        }
    })
})

// delete contact
router.delete('/contacts/:id',(req,res,next)=>{
    Contact.deleteOne({_id:req.params.id},(err,result)=>{
        if(err){res.json(err)}
        else{ 
            res.json(result)
        }
    });
});
module.exports=router;