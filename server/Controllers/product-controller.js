//import User model
const {Product} = require("../db");
require('dotenv').config()

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).send({ message: "products", payload: products });
};

const getProductByproductname = async (req, res) => {

    const { productname } = req.params; // Assuming username is passed as a parameter
    const product = await Product.findOne({ productname });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send({ message: "Product found", payload:product });
};



//add new  product
const addProduct = async (req, res) => {
  //check for existing user with same username
  let existingProduct = await Product.findOne({ productname: req.body.productname });
  //user already existed
  if (existingProduct!== null) {
    return res.status(200).send({ message: "Product already existed" });
  }
  const newProduct = await Product.create(req.body);
  res.status(201).send({ message: "Product created", payload: newProduct });
};


const updateProduct = async (req, res) => {
  const {productname}=req.params;
  const {price,description}=req.body;
  let product = await Product.findOneAndUpdate({ productname},{ price,description},{new:true});
  res.status(200).send({ message: "Product modified", payload: product });
};

const removeProduct = async(req, res) => {
  const {productname}=req.params;
  const deletedProduct=await Product.findOneAndDelete({productname});
  res.status(200).send({ message: "Product Removed", payload: deletedProduct });
  
};


const getProtectedRoute=(req,res)=>{
  res.send({message:"Reply from protected route"})
}



//export
module.exports = {getProducts,getProductByproductname,addProduct,updateProduct,removeProduct,getProtectedRoute};
