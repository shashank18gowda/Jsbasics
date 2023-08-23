const express = require ("express")
const router = express.Router()
const validator = require("validator")


const schema = require("../models/schema")

//get operation
router.get('/',async (req ,res)=>{
   try{
    const check = await schema.find()
    res.json(check)
   }catch(err){
    res.send("Error"+err)
   }
    
})
//get by id operation
router.get('/:id',async (req ,res)=>{
    try{
     const check = await schema.findById(req.params.id)
     res.json(check)
    }catch(err){
     res.send("Error"+err)
    }
     
 })

 //post operation
router.post('/',async(req,res)=>{
       try{
        const{ name,email,regNo,mat_stat }= req.body;

       

    const data = new schema({
        name:name,
        regNo:regNo,
        mat_stat:mat_stat,
        email:email
    })

    await data.save()
      return res.send("data inserted")

    }catch(err){
       return res.send("error"+err.stack)
    }
})


//patch operation

router.patch('/:id',async (req ,res)=>{
    try{
        const{ name,email,regNo,mat_stat }= req.body;
const updateUserList = {}
        if(req.body.name){
            updateUserList.name = req.body.name;
        }
        // if(req.body.email){
        //     updateUserList.name = req.body.regNo;
        // }
        if(req.body.regNo){
            updateUserList.name = req.body.regNo;
        }
        if(req.body.mat_stat){
            updateUserList.name = req.body.mat_stat;
        }
        
       
        const check = await schema.findById(req.params.id)

        if(!check ){
            res.send("user not found")
        }

        check.set(updateUserList);
        await check.save();
        return res.send("Data updated");

        // const data = new schema({
        //     name:name,
        //     regNo:regNo,
        //     mat_stat:mat_stat
        // })
    
        // check.mat_stat =req.body.mat_stat
        // check.name =req.body.name

        // check.regNo =req.body.regNo

        //  await check.save()
        //  return res.send("data updated")

    }catch(err){
     res.send("Error" + err)
    }
     
 })

//delete by id operation
router.delete('/:id',async (req ,res)=>{
    try{
     const check = await schema.findByIdAndDelete(req.params.id)
    if(!check){
    res.send("user not found")
    }
    res.send("data deleted")


    }catch(err){
     res.send("Error"+err)
    }
     
 })
//====================================================================
// try{
//     const check = await schema.findById(req.params.id)
//     schema.deleteOne([check])

//    if(!check){
//    res.send("user not found")
//    }
//    res.send("data deleted")


//    }catch(err){
//     res.send("Error"+err)
//    }
// })




module.exports = router