// const dotenv =require("dotenv");
// const { RESPONSE } = require("../config/global");
// const { send } = require("../config/responseHelper");
// dotenv.config();

// const {STRIPE_SECRET_KEY,STRIPE_PUBLISHER_KEY } = process.env;
// const stripe = require('stripe')(STRIPE_SECRET_KEY)


// const createCust = async(req,res)=>{
//     try{
//         const customer = await stripe.customers.create({
//             name:req.body.name,
//             email:req.body.email,

//         });
// return send(res,RESPONSE.SUCCESS,{customer:customer});

//     }catch(err){
// return send(res,RESPONSE.ERROR,err.message);

//     }
// }

// const addNewCard = async(req,res)=>{
//     try{
//         const{
//             customer_id,
//             card_Name,
//             card_ExpYear,
//             card_ExpMonth,
//             card_Number,
//             card_CVC
//         }  = req.body;

// const card_token = await stripe.tokens.create({
//     card:{
//         name: card_Name,
//         number: card_Number,
//         exp_year:   card_ExpYear,
//         exp_month:   card_ExpMonth,
//         cvc:  card_CVC
//     }
// });

// const card = await stripe.customers.createSource(customer_id,{
//     source: card_token.id
// });
// return send(res,RESPONSE.SUCCESS,{card:card.id});


//     }  catch(err){
//         console.log(err.stack);
//         return send(res,RESPONSE.ERROR,err.stack);

//             }
// }



const dotenv = require("dotenv");
const { RESPONSE } = require("../config/global");
const { send } = require("../config/responseHelper");
dotenv.config();

const STRIPE_SECRET_KEY = "sk_test_51N92pASI6pQiAMF5XK3Vq9wZZOynSLX2gxT7waw0dfYBj0M8dcoPKOZH5IPakrlk88XDZK630nwvoZcuVr24ABb200pScx6AHq";
const stripe = require('stripe')(STRIPE_SECRET_KEY)


const createCust = async (req, res) => {
    try {
        const customer = await stripe.customers.create({
            email: req.body.email,
            name: req.body.name,
        });
        return send(res, RESPONSE.SUCCESS, { customer_ID: customer.id });
    } catch (error) {
        console.log("create", error.stack);
        return send(res, RESPONSE.ERROR)
    }
};


const addNewCard = async (req, res) => {
    try {
        const {
            customer_id,
            card_Name,
            card_ExpYear,
            card_ExpMonth,
            card_Number,
            card_CVC
        } = req.body;

        const card_token = await stripe.tokens.create({
            card: {
                name: card_Name,
                number: card_Number,
                exp_year: card_ExpYear,
                exp_month: card_ExpMonth,
                cvc: card_CVC
            }
        });

        const card = await stripe.customers.createSource(customer_id, {
            source: card_token.id
        });
        return send(res, RESPONSE.SUCCESS, { card: card.id });
    }

    catch (error) {
        console.log("card", error.stack);
        return send(res, RESPONSE.ERROR,{ error: error.message });
    }
};


const createCharges = async (req, res) => {
    try {
        const createCharge = await stripe.paymentIntents.create({
            receipt_email: 'shashank@accelerlab.in',
            amount: parseInt(req.body.amount) * 100,
            currency: 'INR',
            card: req.body.card_id,
            customer: req.body.customer_id,
            
           confirm: true,
            return_url: "http://localhost:3003/success",
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never',
            },
        });
        Id = createCharge.id;
        //  Status = createCharge.status;
        return send(res, RESPONSE.SUCCESS, { charges: createCharge })

    } catch (error) {
        console.log("charges", error.stack);
        return send(res, RESPONSE.ERROR,{ error: error.message });
    }
    
}
  const success = async (req, res) => {
    try {
      
        return send(res, RESPONSE.SUCCESS, { message: 'Payment successful' });
    } catch (err) {
        console.error(' error:', err.stack);
        return send(res, RESPONSE.ERROR,{ error: err.message });
    }
}; 
// const success = async (req, res) => {
//     try {
//         const paymentIntentId = Id
//         console.log(Id);

//         const paymentRetrive = await stripe.paymentIntents.retrieve(paymentIntentId);
//         const paymentConfirm = await stripe.paymentIntents.confirm(paymentIntentId,
//             { payment_method: 'pm_card_visa' }
//         );
//         if (paymentRetrive.status === 'requires_action') {
//             const stripeJsUrl = paymentConfirm.next_action.use_stripe_sdk.stripe_js;
//             const returnUrl = 'http://localhost:3003/success';
//             const redirectUrl = `${stripeJsUrl}&return_url=${returnUrl}`;
//             // console.log(stripeJsUrl)
//             return res.redirect(redirectUrl);
//         }
//         if (paymentRetrive.status === 'succeeded') {
//             return send(res, RESPONSE.SUCCESS, { message: 'Payment successful' });
//         }
//         return send(res, RESPONSE.ERROR, { message: 'Payment failed' });

//     } catch (err) {
//         console.error(' error:', err.stack);
//         res.status(400).send('error');
//     }
// };
const stripeRedirect = async (req, res) => {
    try {
         const paymentRetrive = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentRetrive.status === 'succeeded') {
            return send(res, RESPONSE.SUCCESS, { message: 'Payment successful' });
        } else {
            return send(res, RESPONSE.ERROR, { message: 'Payment failed' });
        }
    } catch (err) {
        console.error(' error:', err.stack);
        return send(res, RESPONSE.ERROR,{ error: err.message });
    }
}; 

module.exports = { createCust, addNewCard, createCharges, success, stripeRedirect }

