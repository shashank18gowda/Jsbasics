const bodyParser = require('body-parser');
const express = require('express');
const app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


const paymentController = require('../controllers/paymentController');

app.post('/create-cust',paymentController.createCust)
app.post('/add-card',paymentController.addNewCard)
app.post('/create-charges',paymentController.createCharges)
 app.get('/success',paymentController.success)
 app.get('/stripe-redirect',paymentController.stripeRedirect)




module.exports = app;

