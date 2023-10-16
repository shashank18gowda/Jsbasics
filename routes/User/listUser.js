

const { initAddressModel } = require("../../model/addressModel");
const { initUserModel } = require("../../model/userModel");

const getUser = async (req, res) => {
  try {
    const address = await initAddressModel();
    const user = await initUserModel();
    const user_id = req.token.user.id;
console.log(user_id);

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
  
    return res.status(200).send(formattedData);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.stack);
  }
};

module.exports = {getUser};

