const { RESPONSE } = require("../../config/global");
const { send } = require("../../config/responseHelper");
const { initFoodModel } = require("../../model/FoodModel");
const { initcartModel } = require("../../model/cartModel");
const { initorderModel } = require("../../model/orderModel");

//app.post('/cart/:Food_id', (req, res) => {
const addcart = async (req, res) => {
    try {
        const Food = await initFoodModel();
        const cart = await initcartModel();
        const user_id = req.token.user.id;
        const { Food_id } = req.params;
        const { status, quantity } = req.body;

        if (status != 0 && status != 1) {
            return send(res, RESPONSE.ERROR, 'Invalid status');
        }

        const food = await Food.findOne({ where: { Food_id } });

        if (!food) {
            return send(res, RESPONSE.ERROR, 'Food item not found');
        }

        let existingEntry = await cart.findOne({ where: { Food_id, user_id } });



        if (status == 0) {

            if (existingEntry) {
                await existingEntry.destroy();
            }
        } else if (status == 1) {

            if (existingEntry) {
                existingEntry.cart_status = status;
                existingEntry.quantity = quantity;

                await existingEntry.save();
            } else {

                await cart.create({
                    Food_id: Food_id,
                    user_id: user_id,
                    cart_status: status,
                    quantity: quantity
                });
            }
        }
        return send(res, RESPONSE.SUCCESS)

    } catch (err) {
        console.log(err.stack);
        return send(res, RESPONSE.ERROR, err.message);
    }
};

function generateOrderID() {
    return Math.floor(1000000 + Math.random() * 9000000);
}

const getCart = async (req, res) => {
    try {
        const order = await initorderModel();
        const cart = await initcartModel();
        const user_id = req.token.user.id;
        const food = await initFoodModel();
        const getCart = await cart.findAll({ where: { user_id } });
        //  console.log(getCart.Food_id);
        const foodId = getCart.map(entry => entry.Food_id);
        const checkFood = await food.findAll({ where: { Food_id: foodId } });
        const order_id = generateOrderID()

        //const totalFoodPrice = food.price * parseInt(quantity);


        //     const cartItems = getCart.map((item) => {
        //         return {
        //             id: item.id,
        //             Food_id: item.Food_id,
        //             quantity: item.quantity,
        //             price:item.quantity  ,
        //             price: checkFood.map((price) => {
        //                 return{
        //                 price: price.F_price,
        //                 }
        //         })

        //     }
        // })

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
            existingOrder.totalPrice = totalCartPrice;
            existingOrder.food_id = [foodId],
                await existingOrder.save();
        } else {

            await order.create({
                order_id,
                food_id: [foodId],
                user_id,
                totalPrice: totalCartPrice
            });
        }
        return send(res, RESPONSE.SUCCESS, { cartItems: filteredCartItems, totalCartPrice });


    } catch (err) {
        console.log(err.message);
        return send(res, RESPONSE.ERROR, err.message);
    }
};

module.exports = { addcart, getCart } 
