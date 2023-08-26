const mongoose = require("mongoose")


const getSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String ,     
        required: true,
        unique: true
    },

    phone: {
        type: Number,
        unique: true,
        require: true
    },
    stat:{
    type: Boolean,
    default: true
    }

   
});
// getSchema.statics.isThisEmailInUse = async function(email){
//   if(!email) new Error('invalid')
//   try{
//     const user =  await this.findOne({email})
// if(user) return false
// return true;

// }catch(error){
//     console.log("error in isThisEmailInUse"+error.message)
//     return false
// }
// }

module.exports = mongoose.model('getUser', getSchema)




