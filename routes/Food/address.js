const express = require("express")
const app = express()

const s3 = require('..//../middleware/s3');
const { send } = require("../../config/responseHelper")
const { RESPONSE } = require("../../config/global");
const { initAddressModel } = require("../../model/addressModel");


const createAdress = async (req, res) => {
    try {


        const Address = await initAddressModel();

        const user_id = req.token.user.id;
        const { address } = req.body;


        if (!address) {
            return send(res, RESPONSE.ERROR, "address is mandatory");
        }

        let existingUserAddress = await Address.findOne({ where: { user_id } });

        if (!existingUserAddress) {
          
            await Address.create({
                user_id: user_id,
                address: [address],
            });
            return send(res, RESPONSE.SUCCESS, "Address created");
        } else {
            
            if (existingUserAddress.address.includes(address)) {
                return send(res, RESPONSE.ERROR, "Address already exists");
            } 
                const updatedAddress = [...existingUserAddress.address, address];
                existingUserAddress.address = updatedAddress;
                await existingUserAddress.save();
                return send(res, RESPONSE.SUCCESS, "Address Added");
            }

        }



    catch (err) {
        console.error(err.message);
        return send(res, RESPONSE.ERROR, err.stack);
    }
}
module.exports = { createAdress }

