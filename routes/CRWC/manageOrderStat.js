const { RESPONSE } = require("../../config/global")
const { send } = require("../../config/responseHelper")
const { initorderModel } = require("../../model/orderModel")


const getAllOrderList = async (req, res) => {
    try {
        const orderModel = await initorderModel()


        const allOders = await orderModel.findAll()

        if (!allOders) {
            return send(res, RESPONSE.ERROR, "No orders found")
        }

        //         const orders = allOrders.map((item)={
        // return{

        // }
        //         })
        return send(res, RESPONSE.SUCCESS, allOders)
    } catch (err) {
        console.log(err.message);
        return send(res, RESPONSE.ERROR, "something went wrong")

    }
}


//listing by status
const getOrderListByStatus = async (req, res) => {
    try {
        const orderModel = await initorderModel()

        const { order_status } = req.params


        const allOders = await orderModel.findAll({ where: { order_status: order_status } })

        if (!allOders || order_status >= 8 || order_status == 0) {
            return send(res, RESPONSE.ERROR, "No orders found")
        }

        if (order_status == 1) {

            return send(res, RESPONSE.SUCCESS, allOders)

        } else if (order_status == 2) {

            return send(res, RESPONSE.SUCCESS, allOders)

        } else if (order_status == 3) {

            return send(res, RESPONSE.SUCCESS, allOders)

        } else if (order_status == 4) {

            return send(res, RESPONSE.SUCCESS, allOders)

        } else if (order_status == 5) {

            return send(res, RESPONSE.SUCCESS, allOders)

        } else if (order_status == 6) {

            return send(res, RESPONSE.SUCCESS, allOders)

        } else if (order_status == 7) {

            return send(res, RESPONSE.SUCCESS, allOders)

        }


        return send(res, RESPONSE.SUCCESS, allOders)
    } catch (err) {
        console.log(err.stack);
        return send(res, RESPONSE.ERROR, "something went wrong")

    }
}



    //update status
    const updateOrderStat = async (req, res) => {
        try{   
        const orderModel = await initorderModel();
        const {orderId} = req.params
        const { order_status } = req.body
        const order = await orderModel.findOne({where:{order_id :orderId}})
    console.log(order.order_status);
    if(!order){
        return send(res,RESPONSE.ERROR,"order not found or invalid order ID")
    }
        if(order_status==3){ 
            if(order.order_status != 1 && order.order_status !=2  && order.order_status != 3){
                return send(res,RESPONSE.ERROR,`cannot change the status  to ${order_status} [shipped]`)
            }    
            
            const currentTime = new Date();
            order.order_status = order_status;
            order.shipped=currentTime
            await order.save();       
            return send(res,RESPONSE.SUCCESS,"status changed [shipped]")
        }

        if(order_status==4){ 
            if(order.order_status !=3 && order.order_status != 4){
                return send(res,RESPONSE.ERROR,`cannot change the status  to ${order_status} [dispatched]`)            }    
            const currentTime = new Date();
            order.order_status = order_status;
            order.dispatch=currentTime
            await order.save();
            return send(res,RESPONSE.SUCCESS,"status changed [dispatched]")
        } 
        
        if(order_status==5  ){ 
            if(order.order_status !=4 &&  order.order_status != 5){
                return send(res,RESPONSE.ERROR,`cannot change the status  to ${order_status}  [delivered]`)            }    
            const currentTime = new Date();
            order.order_status = order_status;
            order.delivered=currentTime
            await order.save();
            return send(res,RESPONSE.SUCCESS,"status changed [delivered]")
        }

        
        if(order_status==6){ 
            if(order.order_status !=5  && order.order_status != 6){
                return send(res,RESPONSE.ERROR,`cannot change the status  to ${order_status}  [cancelled]`)            }    
                const currentTime = new Date();
          
                order.order_status = order_status;
                order.cancelled=currentTime

            await order.save();
            return send(res,RESPONSE.SUCCESS,"status changed [cancelled]")
        }

            return send(res,RESPONSE.ERROR,"something went wrong")
       
       
       
       
       
       
       
        }catch(err){
            console.log(err.stack);
            return send(res,RESPONSE.ERROR)
        }
    }

{
    // const updateOrderStat = async (req, res) => {
    //     try {
    //         const orderModel = await initorderModel();
    //         const { orderId } = req.params;
    //         const { order_status } = req.body;
    //         const order = await orderModel.findOne({ where: { order_id: orderId } });
    
    //         if (!order) {
    //             return send(res, RESPONSE.ERROR, "Order not found or invalid order ID");
    //         }
    
    //         const currentTime = new Date();
    
    //         if (order_status == 3 || order_status == 4 || order_status == 5 || order_status == 6 || order_status == 7) {
    //             if ((order.order_status == 1 || order.order_status == 2) && (order_status >= 3 && order_status <= 7)) {
    //                 // Admin can update the status from 1 or 2 to 3, 4, 5, 6, 7
    //                 if (order_status == 3) {
    //                     // Set the shipped time when status is changed to 3
    //                     order.shipped = currentTime;
    //                 } else if (order_status == 4) {
    //                     // Set the dispatch time when status is changed to 4
    //                     order.dispatched = currentTime;
    //                 } else if (order_status == 5) {
    //                     // Set the delivered time when status is changed to 5
    //                     order.delivered = currentTime;
    //                 } else if (order_status == 6) {
    //                     // Set the cancelled time when status is changed to 6
    //                     order.cancelled = currentTime;
    //                 } else if (order_status == 7) {
    //                     // Set the refund time when status is changed to 7
    //                     order.refunded = currentTime;
    //                 }
    
    //                 order.order_status = order_status;
    //                 await order.save();
    
    //                 return send(res, RESPONSE.SUCCESS, "Status changed");
    //             } else {
    //                 return send(res, RESPONSE.ERROR, "Invalid status transition");
    //             }
    //         } else {
    //             return send(res, RESPONSE.ERROR, "Invalid status");
    //         }
    //     } catch (err) {
    //         console.log(err.stack);
    //         return send(res, RESPONSE.ERROR);
    //     }
    // };
    
    
}



module.exports = { updateOrderStat, getAllOrderList, getOrderListByStatus }