




module.exports = router
// const express = require("express")

// const app = express()
// app.use(express.json())

// const del = require('./delete');
// const get = require('./get');
// const put = require('./put');
// const post = require('./post');


// app.use('/delete',del)
// app.use('/get',get)
// app.use('/put',put)
// app.use('/post',post)

//const schema = require("../models/schema")

// //get operation
// router.get('/', async (req, res) => {
//     try {
//         const { name, email, phone, stat } = req.body;
//         const check = await schema.find({ stat: 1 })
//         res.json(check)
//     } catch (err) {
//         res.send("Error" + err.stack)
//     }

// })
// //get by id operation
// router.get('/:id', async (req, res) => {
//     try {

//         const check = await schema.findOne({ _id: req.params.id, stat: 1 });

//         if (!check) {
//             return res.send("User does not exist or has been deleted");
//         }

//         res.json(check);
//     } catch (err) {
//         res.send("Error: " + err);
//     }
// });

// //post operation
// router.post('/', async (req, res) => {



//     try {
//         const { name, email, phone } = req.body;
//         const existingEntryEmail = await schema.findOne({ email: email });
//         const existingEntryphone = await schema.findOne({ phone: phone });


// //=========IGNORE================
//         // try {
//         //     const check = await schema.findById(req.params.id)
//         //     res.json(check)
//         // } catch (err) {
//         //     res.send("Error" + err)
//         // }
// //=========IGNORE================

//         const data = new schema({
//             name: name,
//             email: email,
//             phone: phone
//         })
     
//         const val = validator.isEmail(req.body.email);    
//         const ph = validator.isMobilePhone(req.body.phone) && req.body.phone.toString().length === 10
 

// if (!name) {
//     return res.send('Please provide a name');
// }
// if (!email) {
//     return res.send('Please provide a email');
   
// }
// //=========IGNORE================
// // if (!isEmpty(email)) {
// //     return res.send('Please provide an email');
// // }
// // if(validator.isEmpty(val2)){
// //     errors.name ='email field is required';
// // }
//    //     const val2 = validator.isEmpty(req.body.email);    

//     // console.log(val2);
   
// //=========IGNORE================

// if (!phone) {
//     return res.send('Please provide a phone number');
// }


// if (val === false ) {
//     return res.send('Please provide an appropriate email')

// }

// if(typeof req.body.email == undefined){
//     return res.send("email undefined")
// }

// if (existingEntryEmail) {
//     return res.send('An entry with this email already exists');
// }


// if (existingEntryphone) {
//     return res.send('An entry with this phone number already exists');
// }

// //if ( validator.isMobilePhone(req.body.phone) && req.body.phone.toString().length === 10){
// if (!ph == true) {
//     return res.send('Please provide an appropriate phone number')
// }



// await data.save()
// return res.send("data inserted ")

//     } catch (err) {
//     return res.send("error" + err.message)
// }
// })


// //PUT operation
// router.put('/:id', async (req, res) => {
//     try {
//         const { name, email,phone } = req.body;

//         const updateUserList = {}
//         if (req.body.name) {
//             updateUserList.name = req.body.name;
//         }
     
//         if (req.body.email) {
//             updateUserList.name = req.body.email;
//         }
//         if (req.body.phone) {
//             updateUserList.name = req.body.phone;
//         }

//         const check = await schema.findOne({ _id: req.params.id, stat: 1 });


//         if (!check) {
//             res.send("user not found")
//         }

//         check.set(updateUserList);
//         await check.save();
//         return res.send("Data updated");
//     } catch (err) {
//         res.send("Error" + err)
//     }

// })



//         //=============================================
//         // const data = new schema({
//         //     name:name,
//         //     regNo:regNo,
//         //     mat_stat:mat_stat
//         // })

//         // check.mat_stat =req.body.mat_stat
//         // check.name =req.body.name

//         // check.regNo =req.body.regNo

//         //  await check.save()
//         //  return res.send("data updated")
// //====================================================
 


// //delete by id operation
// //MAIN DELETE FUNCTION
// // router.delete('/:id', async (req, res) => {
// //     try {
// //         const { name, email, phone, stat } = req.body;
// //         const itemId = req.params.id;

// //         const data = new schema({

// //             name: name,
// //             email: email,
// //             phone: phone,
// //             stat: stat
// //         })

// //         const updatedItem = await schema.findByIdAndUpdate(itemId,
// //             { stat: 0 },
// //             { new: 1 }
// //         );

// //         if (!updatedItem) {
// //             return res.send("Item not found");
// //         }

// //         res.send("data deleted");

// //     } catch (err) {
// //         res.send("Error: " + err);
// //     }
// // });

// //====================================================
// //WORKING CODE
// // router.delete('/:id',async (req ,res)=>{
// //     try{
// //      const check = await schema.findByIdAndDelete(req.params.id)
// //     if(!check){
// //     res.send("user not found")
// //     }
// //     res.send("data deleted")


// //     }catch(err){
// //      res.send("Error"+err)
// //     }

// //  })
// //==============================================
// // router.delete('/:id', async (req, res) => {
// //     try {
// //         const { name, email, phone } = req.body;
// //         const data = new schema({
// //             name: name,
// //             email: email,
// //             phone: phone
// //         })

// //         const check = await schema.findByIdAndDelete(req.params.id)
// //         if (!check) {
// //             return res.send("user not found")
// //         }
// //         check.deleted = true;
// //         await data.save();

// //         return res.send("data deleted")


// //     } catch (err) {
// //         return res.send("Error" + err.stack)
// //     }

// // })
// //====================================================================
// // try{
// //     const check = await schema.findById(req.params.id)
// //     schema.deleteOne([check])

// //    if(!check){
// //    res.send("user not found")
// //    }
// //    res.send("data deleted")


// //    }catch(err){
// //     res.send("Error"+err)
// //    }
// // })


