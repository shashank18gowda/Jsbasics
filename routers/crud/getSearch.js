const express = require('express');
const {send}= require("../../helper/responseHelper")
const {initEmpModel} = require("../../models/EmpModel")
const router = express.Router();
// app.use(express.json());
const { RESPONSE } = require("../../config/global");
const { Op } = require('sequelize');
const searchEmp = async (req, res) => {
    try {
        const schema = await initEmpModel();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const searchKey = req.params.key;

    //     const regexSearchKey = new RegExp(searchKey, "i");
    //     // const phoneSearchKey = searchKey.toString();
    //     // const phone1 = new RegExp(phoneSearchKey, "i");
    //     const query = {
    //         stat: true,
    //         $or: [
    //             { "name": { $regex: regexSearchKey } },
    //             { "email": { $regex: regexSearchKey } },
    //   //          { "phone": { $regex: phone1 } }

    //         ]
    //     };
    const query = {
        stat: true,
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchKey}%` } },
         // { email: { [Op.iLike]: `%${searchKey}%` } },
         // { phone: { [Op.iLike]: `%${searchKey}%` } },

          // Add other fields you want to search here
        ],
      };


        const totalCount = await schema.count({wwhere:query});

        const data = await schema.findAll({
            where: query,
            offset: skip,
            limit: limit,
          });

        const response = {
            data: data,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
        };

        return res.status(200).json(response);
    } catch (error) {
        console.log(error.stack)
        return send(res, RESPONSE.ERROR );

    }
};



module.exports ={searchEmp}
//===================================================================
// router.get("/search/:key", async (req, res) => {
//     try {
 
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 5

//         const skip = (page - 1) * limit;
// const ph = req.params.key;
// phone = ph.toString()

//         let data = await schema.find({
//             stat: true,
//             "$or": [
//                 { "name": { $regex: req.params.key } },
//                 { "email": { $regex: req.params.key } }
//             //    {  : { $regex: req.params.key } }

//             ]
//         })
//             .skip(skip)
//             .limit(limit);
//         return res.send(data);
//     } catch (er) {
//         return res.send(er.stack, "error");
//     }
// });
//========================================================================
// router.get("/search/:key", validateToken, async (req, res) => {
//     try {
//       let data = await schema.find({
//        stat: true,
//         $or: [
//           {
//             $expr: {
//               $regexMatch: {
//                 input:"$name",
//               regex: req.params.key,
//                 options: "i",
//               },
//             },
//           },

//           { email: { $regex: req.params.key, $options: "i" } },
//         ],
//       });

//       data = data.map((item) => {
//         return {
//           id: item.id,
//          name: item.name,
//         phone: item.phone,
//           email: item.email,

//         };
//       });

//       if (data.length > 0) {
//         return res.send(data);
//       } else {
//         return res.send("no result found");
//       }
//     } catch (err) {
//       return res.send(err.stack);
//     }
//   });




