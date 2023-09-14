
module.exports.RESPONSE = {
//     employeesWithImages:{
//         code: 400,
//         message: "Employee details",
//         data:employeesWithImages
//   },
    
    ITM_NOT_FOUND_OR_USER_NOT_PERMITTED:{
    code: 404,
      message: "Item not found or you are not permitted to delete this details.!",
},
   ITM_NOT_FOUND:{
    code: 404,
      message: "No Item found ",
},
IMG_NOT_FOUND:{
    code: 404,
      message: "Image not found ",
},
INVALID_FILE:{
    code:400,
    message:"invalid image type"
},
INVALID_CRED:{
    code:400,
    message:"invalid Credential"
},   
DATA_DELETED_SUCCESSFULLY:{
    code: 200,
      message: "Data deleted successfully. ",
},
ERROR:{
    code:500,
      message: "ERROR!!!. ",
},
CANT_RETRIVE_SINGLE_FILE:{
    code:500,
      message: "cant retrive single file ",
},
CANT_RETRIVE_ALL_FILE:{
    code:500,
      message: "cant retrive all file ",
},
PROV_IMG:{
    code:500,
      message: "cant retrive all file ",
},
ENTRY_NF_OR_NOT_PERMITTED_THIS_USER:{
    code:404,
    message:"Entry not found or doesn't belong to the user"
},

NO_NAME:{
    code:400,
    message:"Please provide a name"
},


NO_PHONE:{
    code:400,
    message:"Please provide a Phone"
},
NO_EMAIL:{
    code:400,
    message:"Please provide a Email"
},
NO_EMAIL:{
    code:400,
    message:"Please provide a Email"
},


MAN_USERNAME:{
    code:400,
    message:"Username is mandatory"
},

MAN_EMAIL:{
    code:400,
    message:"Email is mandatory"
},
MAN_PASSWORD:{
    code:400,
    message:"Password is mandatory"
},


IMG_REQ:{
    code:400,
    message:"Image is required"
},

PHONE_ALREADY_EXIST:{
    code:400,
    message:"An entry with this phone already exists"
},
EMAIL_ALREADY_EXIST:{
    code:400,
    message:"An entry with this email already exists"
},
USER_ALREADY_EXIST:{
    code:400,
    message:"User already exists"
},
PHONE_INVALID:{
    code:400,
    message:"Please provide an appropriate phone number"
},
EMAIL_INVALID:{
    code:400,
    message:"Please provide an appropriate email"
},
MAX_IMG_SIZE:{
    code:400,
    message:"Maximum image size is 200kb"
},
INVALID_TOKEN:{
    code:400,
    message:"Invalid Token"
},

D_INSERT_SUCCESS:{
    code:201,
    message:"Img uploaded and employee created",

},
IMG_INSERTED:{
    code:201,
    message:"Image uploaded successfully"
},
IMG_LIMIT_EXCEEDED:{
    code:400,
    message:"Limit exceeded. Only 20 images at a time are allowed"
},
USER_NOT_AUTH:{
    code:403,
    message:"User Not Authorized"
},

USER_NOT_PERMITTED:{
    code:403,
    message:"You are not permitted to change this details."
},
D_UPDATED_SUCCESS:{
    code:201,
    message:"Data Updated Succesfully"
},
U_CREATED_SUCCESS:{
    code:201,
    message:`User created successfully:`,
    
},
OK:{
    code:201,
    message:`ok`
},
SUCCESS: {
    code: 200,
    message: "Everything worked as expected",
  },
    // SUCCESS: {
    //   code: 200,
    //   message: "Everything worked as expected",
    // },
    // UNKNOWN_ERROR: {
    //   code: 500,
    //   message: "Something went wrong. Please try again later",
    // },
    // INVALID_ID: {
    //   code: 202,
    //   message: "Invalid given id",
    // },
    // REQUIRED: {
    //   code: 203,
    //   message: "All fields are required",
    // },
    // ALREADY_EXISTS: {
    //   code: 204,
    //   message: "User Already Exist. Please Login",
    // },
    // PASSWORD_LENGTH: {
    //   code: 205,
    //   message: "Password is week",
    // },
    // INVALID_TOKEN: {
    //   code: 401,
    //   message: "Invalid token",
    // },
    // USER_NOT_FOUND: {
    //   code: 400,
    //   message: "Please provide autherisation token",
    // },
    // INVALID_INPUT_FORMAT: {
    //   code: 210,
    //   message: "Invalid input format",
    // },
    // PHONE_NO_ALREADY_EXISTS: {
    //   code: 211,
    //   message: "Phone no. already exists",
    // },
    // INVALID_IMAGE: {
    //   code: 226,
    //   message: "JEG/PNG/JPEG/HEIC file are allwored",
    // },
    // FILE_TOO_LARGE: {
    //   code: 227,
    //   message: "File size should be in less then 2MB",
    // },
    // NOT_MATCH: {
    //   code: 228,
    //   message: "Email and password does'nt match",
    // },
    // IMAGE_REQUIRED: {
    //   code: 229,
    //   message: "Image is required!",
    // },
    // FILE_ERRROR: {
    //   code: 230,
    //   message: "JPG/PNG/HEIC images are within 2MB is needed",
    // },
    // EMAIL_ALREADY_EXISTS: {
    //   code: 211,
    //   message: "Email address already exists, try another",
    // },
    // NO_RESULT_FOUND: {
    //   code: 212,
    //   message: "No result found!",
    // },
  };
  
