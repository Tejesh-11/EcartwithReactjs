//create a Route(mini exp app)
const exp2= require("express");
const productApp = exp2.Router();

//get express-async-handler to handle async errors
const expressAsyncHandler = require("express-async-handler");

//import req handlers from Controller
const {getProducts,getProductByproductname,addProduct,updateProduct,removeProduct,getProtectedRoute} = require("../Controllers/product-controller");


//user CRUD

//read all users
productApp.get("/products", expressAsyncHandler(getProducts));
//read user by username
productApp.get("/product/:productname", expressAsyncHandler(getProductByproductname));
//create user
productApp.post("/product", expressAsyncHandler(addProduct));

//update user
productApp.put("/product/:productname", expressAsyncHandler(updateProduct));
//delete user by username
productApp.delete("/product/:productname", expressAsyncHandler(removeProduct));



//export userApp
module.exports = productApp;
