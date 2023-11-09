const jwt = require("jsonwebtoken");
const { RESPONSE } = require("../config/global");
const { send } = require("../config/responseHelper");

const validateToken = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                
                return send(res, RESPONSE.ERROR, "permission is required");
            }
               req.token = decoded;
            next();
        });
    } else {
        return send(res, RESPONSE.ERROR, { message: "invalid token" });
    }
};
module.exports = {validateToken}
