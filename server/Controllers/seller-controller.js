//import User model
const {Seller} = require("../db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const getSellers = async (req, res) => {
  const sellersList = await Seller.find();
  res.status(200).send({ message: "sellers", payload: sellersList });
};

const getSellerByUsername = async (req, res) => {

    const { username } = req.params; // Assuming username is passed as a parameter
    const seller = await Seller.findOne({ username });
    if (!seller) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User found", payload:seller });
};


//Create new User
const createSeller = async (req, res) => {
  //check for existing user with same username
  let existingSeller = await Seller.findOne({ username: req.body.username });
  //user already existed
  if (existingSeller !== null) {
    return res.status(200).send({ message: "Seller already existed" });
  }
  //if user not existed, then hash password
  const hashedPassword = await bcryptjs.hash(req.body.password, 6);
  //replace plain password with hashed pw
  req.body.password = hashedPassword;
  const newSeller = await Seller.create(req.body);
  res.status(201).send({ message: "Seller created", payload: newSeller });
};

//User login
const loginSeller = async (req, res) => {
  //get user crdentials object from req
  const sellerCredentials = req.body;
  //check username
  let seller = await Seller.findOne({ username: sellerCredentials.username });
  //if invalid username
  if (seller === null) {
    return res.status(200).send({ message: "Invalid username" });
  }

  
  //if username is found, compare passwords
  const result = await bcryptjs.compare( sellerCredentials.password, seller.password);

  //if pasword not matched
  if (result === false) {
    return res.status(200).send({ message: "Invalid password" });
  }
  //Create jwt token and sign it
  const signedToken = jwt.sign({ username: seller.username }, process.env.SECRET_KEY,{ expiresIn: "1d" });
  //delete password field from user
  // delete user.password;

  res.status(200).send({ message: "login success", token: signedToken, seller:{username:seller.username,email:seller.email,companyname:seller.companyname,userType:seller.userType}});
};

const updateSeller = async (req, res) => {
  let seller = await Seller.findOneAndUpdate({ username: req.body.username },{ ...req.body });
  res.status(200).send({ message: "User modified", payload: seller });
};

const removeSeller = (req, res) => {
  res.send({ message: "seller removed" });
};


const getProtectedRoute=(req,res)=>{
  res.send({message:"Reply from protected route"})
}

//export
module.exports = {getSellers,getSellerByUsername,createSeller,updateSeller,removeSeller,loginSeller,getProtectedRoute};
