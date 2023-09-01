const express = require ("express")
const router = express.Router()
const Image = require('../models/imagemodel');



router.get('/images/:filename', async (req, res) => {
    try {
      const { filename } = req.params
 //     const { url } = req.params;
//const imgDest = `../retrive/images/${filename}`
      const image = await Image.findOne({filename});

         if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }
  
      //const Burl = image.url;
      //return res.json({image})
   
    res.sendFile(image.filename, { root: './uploads' });
    } catch (error) {
      res.status(500).json({ error: 'cant retrive single file' });
    }
  }); 
  
  router.get('/images', async (req, res) => {
      try {
       
        const { _id, filename , originalName} = req.params;
        const image =  await Image.find(_id,filename, originalName);
       
     
        if (!image) {
          return res.status(404).json({ error: 'Image not found' });
        } 

     //   const url = images.map(image => image.url);
     //   return res.send(`http:/retrive/images/${Image.filename}`)
   // return res.json(image)
   const url = image.map(image =>({
    id : image._id,
    filename: `/retrive/images/${image.filename}`,
    originalName: image.originalName
   }));

   return res.json(url)


      } catch (error) {
        res.status(500).json({ error: 'cant retrieve all file' });
      }
    });
    
  
  module.exports = router;