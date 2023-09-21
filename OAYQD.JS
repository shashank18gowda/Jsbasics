const success = async (req, res) => {
    try {
      
        return send(res, RESPONSE.SUCCESS, { message: 'Payment successful' });
    } catch (err) {
        console.error(' error:', err.stack);
        res.status(400).send('error');
    }
};

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
        res.status(400).send('error');
    }
};