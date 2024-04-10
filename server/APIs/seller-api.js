//create a Route(mini exp app)
const exp1 = require("express");
const sellerApp = exp1.Router();
const verifyToken=require('../Middlewares/verifyToken')
//get express-async-handler to handle async errors
const expressAsyncHandler = require("express-async-handler");

//import req handlers from Controller
const {getSellers,getSellerByUsername,createSeller,updateSeller,removeSeller,loginSeller,addProducts,getProtectedRoute} = require("../Controllers/seller-controller");

//user CRUD

//read all users
sellerApp.get("/sellers", expressAsyncHandler(getSellers));
//read user by username
sellerApp.get("/seller/:username", expressAsyncHandler(getSellerByUsername));
//create user
sellerApp.post("/seller", expressAsyncHandler(createSeller));
//user login
sellerApp.post("/login", expressAsyncHandler(loginSeller));
//update user
sellerApp.put("/seller", expressAsyncHandler(updateSeller));
//delete user by username
sellerApp.delete("/seller/:username", expressAsyncHandler(removeSeller));



//protected route
sellerApp.get("/protected",verifyToken,expressAsyncHandler(getProtectedRoute))

//export userApp
module.exports = sellerApp;
