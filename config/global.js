module.exports.RESPONSE = {

    ITM_NOT_FOUND_OR_USER_NOT_PERMITTED: {
        code: 404,
        message: "Item not found or you are not permitted to delete this details.!",
    },
    ITM_NOT_FOUND: {
        code: 404,
        message: "No Item found ",
    },
    IMG_NOT_FOUND: {
        code: 404,
        message: "Image not found ",
    },
    DATA_DELETED_SUCCESSFULLY: {
        code: 200,
        message: "Data deleted successfully. ",
    },
    ERROR: {
        code: 500,
        message: "ERROR!!!. ",
    },
    SUCCESS: {
        code: 200,
        message: "Everything Worked As Expected!!!. ",
    },
    CANT_RETRIVE_SINGLE_FILE: {
        code: 500,
        message: "cant retrive single file ",
    },
    CANT_RETRIVE_ALL_FILE: {
        code: 500,
        message: "cant retrive all file ",
    },
    PROV_IMG: {
        code: 500,
        message: "cant retrive all file ",
    },
    ENTRY_NF: {
        code: 404,
        message: "No Entries Found"
    },

    F_NAME: {
        code: 400,
        message: "Please provide a Food name"
    },
    INGREDIENT: {
        code: 400,
        message: "Please provide a ingredient"
    },

    DESCRIPTION: {
        code: 400,
        message: "Please provide description"
    },
    CATEGORY: {
        code: 400,
        message: "Please provide a category"
    },
    TIME: {
        code: 400,
        message: "Please valid Time"
    },
    ACCOUNT_NUM: {
        code: 400,
        message: "Please provide Account number"
    },
    // NO_EMAIL:{
    //     code:400,
    //     message:"Please provide a Email"
    // },
    NO_EMAIL: {
        code: 400,
        message: "Please provide a Email"
    },

    MAN_USERNAME: {
        code: 400,
        message: "Username is mandatory"
    },

    MAN_EMAIL: {
        code: 400,
        message: "Email is mandatory"
    },
    MAN_PASSWORD: {
        code: 400,
        message: "Password is mandatory"
    },

    IMG_REQ: {
        code: 400,
        message: "Image is required"
    },
    ALREADY_EXIST: {
        code: 400,
        message: "An entry with this Name already exists"
    },
    PHONE_ALREADY_EXIST: {
        code: 400,
        message: "An entry with this phone already exists"
    },
    EMAIL_ALREADY_EXIST: {
        code: 400,
        message: "An entry with this email already exists"
    },
    USER_ALREADY_EXIST: {
        code: 400,
        message: "User already exists"
    },
    PHONE_INVALID: {
        code: 400,
        message: "Please provide an appropriate phone number"
    },
    EMAIL_INVALID: {
        code: 400,
        message: "Please provide an appropriate email"
    },
    INVALID_DATE_FORMAT: {
        code: 400,
        message: "Please provide an appropriate date"
    },
    MAX_IMG_SIZE: {
        code: 400,
        message: "Maximum image size is 200kb"
    },

    D_INSERT_SUCCESS: {
        code: 201,
        message: "Data inserted",
    },
    IMG_INSERTED: {
        code: 201,
        message: "Image uploaded successfully"
    },
    IMG_LIMIT_EXCEEDED: {
        code: 400,
        message: "Limit exceeded. Only 20 images at a time are allowed"
    },


    USER_NOT_PERMITTED: {
        code: 403,
        message: "You are not permitted to change this details."
    },
    D_UPDATED_SUCCESS: {
        code: 201,
        message: "Data Updated Succesfully"
    },
    U_CREATED_SUCCESS: {
        code: 201,
        message: `User created successfully:`
    }
}
