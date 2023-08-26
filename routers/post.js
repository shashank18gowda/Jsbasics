const express = require("express")
const router = express.Router()
var validator = require('validator');


const schema = require("../models/schema")

router.post('/', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const existingEntryEmail = await schema.findOne({ email: email });
        const existingEntryphone = await schema.findOne({ phone: phone });



        // try {routers/post.js
        //     const check = await schema.findById(req.params.id)
        //     res.json(check)
        // } catch (err) {
        //     res.send("Error" + err)
        // }


        const data = new schema({
            name: name,
            email: email,
            phone: phone
        })
     
        const val = validator.isEmail(req.body.email);    
        const ph = validator.isMobilePhone(req.body.phone) && req.body.phone.toString().length === 10
    //     const val2 = validator.isEmpty(req.body.email);    

    // console.log(val2);
   

if (!name) {
    return res.send('Please provide a name');
}

// if (!isEmpty(email)) {
//     return res.send('Please provide an email');
// }

if (!phone) {
    return res.send('Please provide a phone number');
}
// if(validator.isEmpty(val2)){
//     errors.name ='email field is required';
// }

if (!email || email == "" || !val) {
    return res.send('Please provide an appropriate email')
}

// if(){
//     return res.send("email undefined")
// }

if (existingEntryEmail) {
    return res.send('An entry with this email already exists');
}


if (existingEntryphone) {
    return res.send('An entry with this phone number already exists');
}

//if ( validator.isMobilePhone(req.body.phone) && req.body.phone.toString().length === 10){
if (!ph == true) {
    return res.send('Please provide an appropriate phone number')
}



await data.save()
return res.send("data inserted ")

    } catch (err) {
    return res.send("error" + err.stack)
}


})
module.exports = router
