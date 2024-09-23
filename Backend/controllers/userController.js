const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandeler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const generateToken = require("../config/jwtToken");

//.                                          Register/SignUp
const registerUser = asyncHandler(async (req, res) => {
    const {firstname, lastname, email, mobileNo, password} = req.body;
    
    // Validation for required fields
    if (!firstname || !lastname || !email || !mobileNo || !password) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new ApiError(400, "User with this email already exists");
    }

    // Register User
    const user = await User.create({
        firstname, lastname, email, mobileNo, password
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    );
});

//.                                          Login

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists and password matches
    const userExist = await User.findOne({ email });
    // password hide
    // const logInUser = await User.findById(userExist._id).select("-password");
    if (userExist && await userExist.isPasswordMatched(password)) {
        return res.status(200).json(
            new ApiResponse(200, {
                _id : userExist?._id,
                firstname : userExist?.firstname,
                lastname : userExist?.lastname,
                email : userExist?.email,
                mobileNo : userExist?.mobileNo,
                token : generateToken(userExist?._id)
            }, "You are successfully logged in")
        );
    } else {
        throw new ApiError(400, "Invalid Credentials");
    }
});


//.                                          All User List

const allUser = asyncHandler(async (req, res) => {
    const allUserList = await User.find().select("-password");
   // No users found
   if (allUserList.length === 0) {
    return res.status(200).json(
        new ApiResponse(200, [], "No users found")
    );
}
    // List of all users
    return res.status(200).json(
        new ApiResponse(200, allUserList, "List of all users")
    )
   
});

//.                                          single User details 

const singleUser = asyncHandler(async (req, res) => {
    const {id} = req.params; // access id from req.params
    // console.log(req.params);
    const user = await User.findById(id).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found with this ID");
    }

    // Response
    return res.status(200).json(
        new ApiResponse(200, user, "User details")
    );
});


//.                                          Delete User  

const deleteUser = asyncHandler(async(req, res) => {
    const {id} = req.params;

    const user = await User.findByIdAndDelete(id);
    if(!user) {
        throw new ApiError(404, "User not found with this ID");
    }
    // Response
    return res.status(200).json(
        new ApiResponse(200, user, "User successfully deleted")
    );
})

const userController = {
    registerUser,
    login,
    allUser,
    singleUser,
    deleteUser
};

module.exports = userController;
