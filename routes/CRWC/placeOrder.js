const { RESPONSE } = require("../../config/global");
const { send } = require("../../config/responseHelper");
const { initFoodModel } = require("../../model/FoodModel");
const { initAddressModel } = require("../../model/addressModel");
const { initcartModel } = require("../../model/cartModel");
const { initorderModel } = require("../../model/orderModel");

const placeOrder = async (req, res) => {

    try {
        const order = await initorderModel();
        const cart = await initcartModel();
        const address = await initAddressModel();
        const user_id = req.token.user.id;
        const { address_id } = req.body;
        const food = await initFoodModel();

        console.log(address_id);
        const getCart = await cart.findAll({ where: { user_id } });
        //  console.log(getCart.Food_id);
        const foodId = getCart.map(entry => entry.Food_id);
        const checkFood = await food.findAll({ where: { Food_id: foodId } });
        const userAd = await address.findOne({ where: { user_id: user_id, id: address_id } });
        const userDis = await address.findAll({ where: { user_id: user_id } });

        if (!userAd) {
            return send(res, RESPONSE.ERROR, "address not found");

        }
        const userAddress = userDis.map((item) => {
            return {
                id: item.id,
                address: item.address
            }
        })

        const cartItems = getCart.map((item) => {

            const matchingFood = checkFood.find(foodItem => foodItem.Food_id === item.Food_id);

            if (matchingFood) {
                return {
                    id: item.id,
                    Food_id: item.Food_id,
                    //  F_name: matchingFood.F_name,
                    quantity: item.quantity,
                    price: matchingFood.F_price,
                    totalPrice: matchingFood.F_price * item.quantity

                };
            }

            return null

        });


        const filteredCartItems = cartItems.filter(item => item !== null);


        let totalCartPrice = 0;

        for (const item of filteredCartItems) {
            totalCartPrice += item.price * item.quantity;
        }

        const existingOrder = await order.findOne({ where: { user_id } });

        if (existingOrder) {
            existingOrder.address_id = address_id;
            await existingOrder.save();
        } else {

            await order.create({
                address: address_id
            });
        }


        return send(res, RESPONSE.SUCCESS, { cartItems: filteredCartItems, totalCartPrice, userAddress });


    } catch (err) {
        console.log(err.stack);
        return send(res, RESPONSE.ERROR, err.message);
    }
};
//------------------------------------------------------------------------


const paymentMethod = async (req, res) => {
    try {
        const { paymentMethod } = req.body
const order = await initorderModel();
const user_id = req.token.user.id
        const existingOrder = await order.findOne({ where: { user_id } });
      
        if (paymentMethod == 1 ||paymentMethod == 2) {
            if (existingOrder) {
                existingOrder.mop = paymentMethod;
                await existingOrder.save();
            } else {
                await order.create({
                    mop: paymentMethod
                });
            }
            return send(res,RESPONSE.SUCCESS,"Payment Method Added")
        }
        return send(res,RESPONSE.ERROR,"invalid payment method")


    } catch (err) {
        console.log(err.stack);
        return send(res, RESPONSE.ERROR, err.message);
    }
}

module.exports = { placeOrder ,paymentMethod}

