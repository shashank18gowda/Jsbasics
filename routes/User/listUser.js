

const { RESPONSE } = require("../../config/global");
const { send } = require("../../config/responseHelper");
const { initAddressModel } = require("../../model/addressModel");
const { initUserModel } = require("../../model/userModel");

const getUser = async (req, res) => {
  try {
    const address = await initAddressModel();
    const user = await initUserModel();
    const user_id = req.token.user.id;
   const data = await user.findAll({
      include: [{
        model: address,
        as: "addressInfo",
      }],
      where: { id: user_id },
    })
    const formattedData = data.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        address: user.addressInfo.map((address) => ({
          id: address.id,
          address: address.address,
        })),
      }));
  
    return send(res,RESPONSE.SUCCESS,formattedData);
  } catch (err) {
    console.log(err.message);
    return send(res,RESPONSE.ERROR,err.stack);
  }
};

module.exports = {getUser};

