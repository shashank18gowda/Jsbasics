const { RESPONSE } = require("../../config/global");

const { send } = require("../../config/responseHelper");
const { initUserModel } = require("../../model/userModel");
const { initAddressModel } = require("../../model/addressModel");

// @access private
const getuser = async (req, res) => {
    try {
        const userAd = await initAddressModel();
        const user = await initUserModel();
        const user_id = req.token.user.id;
        console.log(req.token.user.id);


        // let check = await user.findOne({ where: { user_id: user_id }, });
        // let userAddress = await userAd.findOne({ where: { user_id:user_id }, });
        // if (!check && !userAddress) {
        //     return send(res, RESPONSE.ERROR, "user not found ")
        // } else if (check && !userAddress) {
        //     return send(res, RESPONSE.ERROR, "user  found adressNotFound ")
        // } else
        //     return send(res, RESPONSE.SUCCESS, "both found")

        let data = await userAd.findAll({
            include: [{
             //   model: userAd.user,
             model: user,   
             as: "addressInfo",
          //   attributes: ["id", "username", "email", "phNumber"],
            },],
          //  attributes: ["address_id", "address"],
            // where: { user_id: req.token.user.id },
           
        })

        const responseData = data.map((item) => ({
            
            username: item.addressInfo.username,
            email: item.addressInfo.email,
            phNumber: item.addressInfo.phNumber,
            address: item.address,
           
          }));

        return send(res, RESPONSE.SUCCESS, responseData)
    }

    catch (err) {
        console.log(err.stack);
        return send(res, RESPONSE.ERROR, err.message)
    }
};




module.exports = { getuser }






