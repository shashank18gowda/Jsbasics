const { RESPONSE } = require("./config/global");
const { send } = require("./config/responseHelper");

const router = require("express").Router();


router.get("/movie",async(req,res)=>{
    try{
const page = parseInt(req.query.page) - 1||0;
const limit =parseInt(req.query.limit) || 5;
const search =req.query.search || "";
let sort = req.query.sort || "rating";



    }catch(err){
return send(res,RESPONSE.ERROR,err.message)
    }
})






























// const initEmpModel = async (res) => {
//     try {
//       let Emp = null;
//       if (Emp) return Emp;
//       const sequelize = await getConnection();
//       const User = await initUserModel();
//       Emp = sequelize.define("Emp", EmpModel, {
//         freezeTableName: true,
//       });
      
//       Emp.belongsTo(User, { foreignKey: 'user_id' });
  
//       await Emp.sync({ alter: true });
//       return Emp;
//     } catch (err) {
//       return send(res,RESPONSE.ERROR,err.message)
//     }
//   };