const { RESPONSE } = require("../config/global");
const { send } = require("../config/responseHelper");

const checkAdminRole = (req, res, next) => {
   
    const userRole = req.token && req.token.user && req.token.user.role ; 
    const adminRole = req.token && req.token.Admin && req.token.Admin.role ; 

   /// console.log("eeeee",req.token.user.role);
    // console.log('User Role:', req.token.user);
    // console.log('admin Role:', req.token.Admin.role);

   
   if (userRole !== 1 && adminRole !==1 ) {
        return send(res, RESPONSE.ERROR, "Only admins are allowed ");
    }
    next();
};

const checkUserRole = (req, res, next) => {
   
    const userRole = req.token && req.token.user && req.token.user.role ; 
    const adminRole = req.token && req.token.Admin && req.token.Admin.role ; 

   if (userRole !== 2 && adminRole !==2) {
        return send(res, RESPONSE.ERROR, "Only users are allowed ");
    }
    next();
};

const checkUserAdmin = (req, res, next) => {
   
    const userRole = req.token && req.token.user && req.token.user.role ; 
    const adminRole = req.token && req.token.Admin && req.token.Admin.role ; 

   /// console.log("eeeee",req.token.user.role);
    //console.log('User Role:', req.token.user.role);
   // console.log('admin Role:', req.token.Admin.role);

   
   if (userRole == 2 || adminRole == 1 ) {
    next();    
    
    }
    // return send(res, RESPONSE.ERROR, "something went wrong");
};

module.exports = {checkAdminRole,checkUserRole,checkUserAdmin}