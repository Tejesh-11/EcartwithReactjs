//import mongoose
const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.LOCAL_DB_URL;
//coonect to DB
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB connection success");
  })
  .catch((err) => console.log("Error in DB connect", err));

//create User schema
const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: [true, "Username is required, but missed"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: String,
  address: String,
  userType:{
    type:String,
    enum:["user","seller"],
    default:"user"
  },
  cart:{
    type:Array,
    default:[]
  },
  profileImageUrl:String
});


//create Seller schema
const sellerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required, but missed"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: String,
  companyname:String,
  userType:{
    type:String,
    enum:["user","seller"],
    default:"seller"
  }
  
});


//create Product schema
const productSchema=new mongoose.Schema({
  productname: {
    type: String,
    required: [true, "Productname is required, but missed"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: String,

})



//create Model(class) for the userSchema
const User = mongoose.model("user", userSchema);
const Seller = mongoose.model("seller", sellerSchema);
const Product= mongoose.model("product",productSchema);


//export User model
module.exports = {User,Seller,Product};


