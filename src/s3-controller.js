// const formidable = require('formidable');
// const {uploadFileToS3} = require('./s3-service');
// async function s3Upload(req,res){
//     const formData = await readFormData(req);
//     try{
//         await uploadFileToS3(formData.file,'node-js-s3-system5')
//         res.send('Uploaded!!')
//     }catch(ex){
//         console.log(ex)
//         res.send('ERROR..!');
//     }
// }

// async function readFormData(req){
//     return new Promise (resolve=>{
//         const dataObj = {};
//         var form = new formidable.IncomingForm();
//         form.parse(req);

//         form.on('file',(name,file)=>{
//             dataObj.name=name;
//             dataObj.file=file;
//         });
//         form.on('end',()=>{
//             resolve(dataObj);
//         });
//     });
// }
// module.exports ={
//     s3Upload
// }