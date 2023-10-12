const { RESPONSE } = require("../../config/global");
const { send } = require("../../config/responseHelper");
const { initFoodModel } = require("../../model/FoodModel");
const { initWishlistModel } = require("../../model/wishListModel");

//app.post('/wishlist/:Food_id', (req, res) => {
const addWishList = async (req, res) => {
    try {
        const Food = await initFoodModel();
        const Wishlist = await initWishlistModel();
        const user_id = req.token.user.id;
        const { Food_id } = req.params;
        const { status } = req.body;

        if (status != 0 && status != 1) {
            return send(res, RESPONSE.ERROR, 'Invalid status');
        }

        const food = await Food.findOne({ where: { Food_id } });

        if (!food) {
            return send(res, RESPONSE.ERROR, 'Food item not found');
        }

        let existingEntry = await Wishlist.findOne({ where: { Food_id, user_id } });

        if (status == 0) {
         
            if (existingEntry) {
                await existingEntry.destroy();
            }
        } else if (status == 1) {
    
            if (existingEntry) {
                existingEntry.wishList_status = status;
                await existingEntry.save();
            } else {
                
                await Wishlist.create({
                    Food_id: Food_id,
                    user_id: user_id,
                    wishList_status: status,
                });
            }
        }
        return send(res, RESPONSE.SUCCESS);
    } catch (err) {
        console.log(err.stack);
        return send(res, RESPONSE.ERROR, err.message)
    }
};

module.exports = { addWishList } //getwishListByUser

