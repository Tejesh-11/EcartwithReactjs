//create a Route(mini exp app)
const exp = require("express");
const userApp = exp.Router();
const verifyToken=require('../Middlewares/verifyToken')
const {upload}=require('../Middlewares/cloudinaryUpload')


//get express-async-handler to handle async errors
const expressAsyncHandler = require("express-async-handler");

//import req handlers from Controller
const {getUsers,getUserByUsername,createUser,updateUser,addToCart,removeFromCart,getCartItems,removeUser,loginUser,getProtectedRoute} = require("../Controllers/user-controller");

//user CRUD

//read all users
userApp.get("/users", expressAsyncHandler(getUsers));
//read user by username
userApp.get("/user/:username", expressAsyncHandler(getUserByUsername));
//create user
userApp.post("/user",upload.single('pic'), expressAsyncHandler(createUser));
//user login
userApp.post("/login", expressAsyncHandler(loginUser));
//update user
userApp.put("/user", expressAsyncHandler(updateUser));


//add-to-cart
userApp.put("/addcart",expressAsyncHandler(addToCart));
//remove-from-cart
userApp.put("/removecart",expressAsyncHandler(removeFromCart));
//get users cart items
userApp.get("/cart/:username",expressAsyncHandler(getCartItems));

//delete user by username
userApp.delete("/user/:username", expressAsyncHandler(removeUser));


//protected route
userApp.get("/protected",verifyToken,expressAsyncHandler(getProtectedRoute))

//export userApp
module.exports = userApp;
