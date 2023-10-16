
const { send } = require("../../config/responseHelper")
const { RESPONSE } = require("../../config/global");
const  {initAddressModel}  = require("../../model/addressModel");


const addAddress = async (req, res) => {
    try {


        const Address = await initAddressModel();
       
        const user_id = req.token.user.id;
        const { address } = req.body;
        console.log(user_id);

        if (!address) {
            return send(res, RESPONSE.ERROR, "address is mandatory");
        }

            await Address.create({
                user_id:user_id,
                address: address,
            });
            return send(res, RESPONSE.SUCCESS, "Address created");
   
        }



    catch (err) {
        console.log(err.message);
        return res.send(err.stack);
    }
}
module.exports = {addAddress}

