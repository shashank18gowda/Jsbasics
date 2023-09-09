// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");

// const validateToken = asyncHandler(async(req,res,next)=>{
//   try{
//      let token;
//     let authHeader = req.headers.Authorization || req.headers.authorization;
//     if(authHeader && authHeader.startsWith("Bearer")){
//         token = authHeader.split(" ")[1];
//         jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
//             if(err){
//                return res.send("user is not authorized");
//             }
//            req.user = decoded.user;
//            next();
//         });

//         if(!token){
//             res.send("invalid Token ")
//         }
//     }
// }catch(err){
// res.send(err.stack,"errorrrr")
// }
// })

const jwt = require("jsonwebtoken");

module.exports = function validateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "User is not authorized" });
            }
            req.user = decoded.user;
            next();
        });
    } else {
        res.status(401).json({ error: "Invalid Token" });
    }
};

