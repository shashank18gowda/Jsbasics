
// //required field
// //var = undefined
// //use or operation in post 



// const express = require("express")
// const router = express.Router()



// const schema = require("../models/schema")
// router.put('/:id', async (req, res) => {
//     try {
//         const { name, email,phone } = req.body;

//         const updateUserList = {}
//         if (req.body.name) {
//             updateUserList.name = req.body.name;
//         }
//         // if(req.body.email){
//         //     updateUserList.name = req.body.regNo;
//         // }        
//         if (req.body.email) {
//             updateUserList.name = req.body.email;
//         }
//         if (req.body.phone) {
//             updateUserList.name = req.body.phone;
//         }

//         const check = await schema.findOne({ _id: req.params.id, stat: true});


//         if (!check) {
//             res.send("user not found")
//         }

//         check.set(updateUserList);
//         await check.save();
//         return res.send("Data updated");

//         // const data = new schema({
//         //     name:name,
//         //     regNo:regNo,
//         //     mat_stat:mat_stat
//         // })

//         // check.mat_stat =req.body.mat_stat
//         // check.name =req.body.name

//         // check.regNo =req.body.regNo

//         //  await check.save()
//         //  return res.send("data updated")

//     } catch (err) {
//         res.send("Error" + err)
//     }

// })

// module.exports = router



// router.post('/upload', upload.array('images', 10), async (req, res) => {
//     try {
//       const uploadedImages = req.files;
      
//       const imagePromises = uploadedImages.map(async (file) => {
//         const { filename, originalname } = file;
//         const image = new Image({
//           filename,
//           originalName: originalname,
//         });
//         await image.save();
//       });
  
//       await Promise.all(imagePromises);
      
//       res.send('Images uploaded successfully');
//     } catch (error) {
//       res.send('Image upload failed: ' + error.stack);
//     }
//   });

//   router.get('/images/:filename', async (req, res) => {
//     try {
//       const { filename } = req.params;
//       const image = await Image.findOne({ filename });
//       if (!image) {
//         return res.status(404).json({ error: 'Image not found' });
//       }
//       res.sendFile(image.filename, { root: './uploads' });
//     } catch (error) {
//       res.status(500).json({ error: 'Image retrieval failed' });
//     }
//   });


// const validExtensions = ['.png', '.jpg', '.jpeg'];
// const validMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

// const fileExtension = path.extname(file.originalname).toLowerCase();
// const extensionIsValid = validExtensions.includes(fileExtension);

// const mimeTypeIsValid = validMimeTypes.includes(file.mimetype);

// if (extensionIsValid && mimeTypeIsValid) {
//     return cb(null, true);
// } else {
//     	cb(new Error('Invalid file type. Only picture file on type PNG and JPG are allowed!'));
	 
// }
// In this corrected version, I've used const to declare the arrays validExtensions and validMimeTypes containing the allowed extensions and mime types respectively. Then, I calculate the file extension using path.extname(file.originalname).toLowerCase() and check its validity using the includes() method. Similarly, I check the validity of the mime type using the includes() method.

// Remember to replace the comments with your actual logic for handling valid and invalid extensions/mime types.











//   try {
//     const uploadedImages = req.files;
    
//     const imagePromises = uploadedImages.map(async (file) => {
//       const { filename, originalname } = file;
//       const image = new Image({
//         filename,
//         originalName: originalname,
//       });
//       await image.save();
//     });

//     await Promise.all(imagePromises);
    
//     res.send('Images uploaded successfully');
//   } catch (error) {
//     res.send('Image upload failed: ' + error.stack);
//   }
// });
router.put("/:id", validateToken, async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const itemId = req.params.id;

        // Check if the item with the specified ID exists and belongs to the authenticated user
        const itemToUpdate = await schema.findOne({ _id: itemId, user_id: req.user.id, stat: true });

        if (!itemToUpdate) {
            return res.send("Item not found or you are not permitted to update this details.");
        }

        // Define the fields to update based on the request body
        const updateUserList = {};

        if (req.body.name) {
            updateUserList.name = req.body.name;
        }

        if (req.body.email) {
            updateUserList.email = req.body.email;
        }

        if (req.body.phone) {
            updateUserList.phone = req.body.phone;
        }

        // Update the item only if the user has permission
        const updatedItem = await schema.findOneAndUpdate(
            { _id: itemId, user_id: req.user.id, stat: true },
            updateUserList,
            { new: true }
        );

        if (!updatedItem) {
            return res.send("Item not found");
        }

        return res.send("Data updated successfully.");
    } catch (err) {
        return res.status(500).send("Error: " + err);
    }
});
