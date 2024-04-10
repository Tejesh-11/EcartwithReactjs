//import User model
const {User} = require("../db");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {cloudinary} =require('../Middlewares/cloudinaryUpload')
require('dotenv').config();
const fs=require("fs");

const getUsers = async (req, res) => {
  const usersList = await User.find();
  res.status(200).send({ message: "users", payload: usersList });
};

const getUserByUsername = async (req, res) => {

    const { username } = req.params; // Assuming username is passed as a parameter
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User found", payload: user });
};


//Create new User
const createUser = async (req, res) => {
  
  const user = JSON.parse(req.body.userObj);
  //check for existing user with same username
  let existingUser = await User.findOne({ username: user.username });
  //user already existed
  if (existingUser !== null) {
    return res.status(200).send({ message: "User already existed" });
  }
  //if user not existed, then hash password
  const hashedPassword = await bcryptjs.hash(user.password, 6);
  //replace plain password with hashed pw
  user.password = hashedPassword;

  //upload img to cloudinary
  let result=await cloudinary.uploader.upload(req.file.path);
  
  //add cloudinary img url to user
  user.profileImageUrl=result.url;

  const newUser = await User.create(user);

  fs.unlink(req.file.path,err=>{
    if(err){
      throw err
    }
    console.log("image removed from local folder")
  })
  
  res.status(201).send({ message: "User created", payload: newUser });
};



//User login
const loginUser = async (req, res) => {
  //get user crdentials object from req
  const userCredentials = req.body;
  //check username
  let user = await User.findOne({ username: userCredentials.username });
  //if invalid username
  if (user === null) {
    return res.status(200).send({ message: "Invalid username" });
  }

  //if username is found, compare passwords
  const result = await bcryptjs.compare( userCredentials.password, user.password);

  //if pasword not matched
  if (result === false) {
    return res.status(200).send({ message: "Invalid password" });
  }
  //Create jwt token and sign it
  const signedToken = jwt.sign({ username: user.username }, process.env.SECRET_KEY,{ expiresIn: "1d" });
  //delete password field from user
  // delete user.password;

  res.status(200).send({ message: "login success", token: signedToken, user:{username:user.username,email:user.email,address:user.address,userType:user.userType,cart:user.cart}  });
};

const updateUser = async (req, res) => {
  let user = await User.findOneAndUpdate({ username: req.body.username },{ ...req.body });
  res.status(200).send({ message: "User modified", payload: user });
};



//cart-operations.....

const addToCart =async(req,res)=>{
  const{username,product}=req.body;
  const user=await User.findOneAndUpdate(
    {username:username},
    {$push:{cart:product}},
    {new:true}
  );
  res.status(200).send({ message: "Product added to cart", payload: user.cart });
}

const removeFromCart=async(req,res)=>{
  const{username,productName}=req.body;
  const user=await User.findOneAndUpdate(
    {username:username},
    {$pull:{cart:{productname:productName}}},
    {new:true}
  );
  res.status(200).send({ message: "Product removed from cart", payload: user.cart });
}

const getCartItems=async(req,res)=>{
  const {username}=req.params;
  const user=await User.findOne({username:username});
  res.status(200).send({ message: "Cart Items Retrieved", payload: user.cart });
}


const removeUser = (req, res) => {
  res.send({ message: "user removed" });
};


const getProtectedRoute=(req,res)=>{
  res.send({message:"Reply from protected route"})
}

//export
module.exports = {getUsers,getUserByUsername,createUser,updateUser,addToCart,removeFromCart,getCartItems,removeUser,loginUser,getProtectedRoute};
