import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function AddProducts() {

  let { register, handleSubmit } = useForm();
  let [error, setError] = useState("");
  let [products,setProducts]=useState({
    productname:'',
    price:'',
    description:''
  });

  const handleChange=(e)=>{
    setProducts({...products,[e.target.name]:e.target.value});
  }

  const onAdd=async(obj) =>{

    try {

      let res = await axios.post("http://localhost:4000/product-api/product", obj);
      alert("Product added Successfully")

    } catch (err) {
      setError(err.message);
    }
  };
 
  
  

  return (

    <div>
    
    {error.length !== 0 &&  (<p className="fs-1 text-center text-danger">{error}</p>)}
    <form className="w-50 mx-auto text-white mb-3 p-3 mt-4" onSubmit={handleSubmit(onAdd)}>

    <div>
        <h1 className="text-white text-center">Add Products</h1>
        {/* productname */}
        <div className="mb-4">
          <label htmlFor="productname" className="form-label">
            Productname
          </label>
          <input
            type="text"
            {...register("productname")}
            className="form-control "
            onChange={handleChange}
          />
        </div>

        {/* price */}
        <div className="mb-4">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            {...register("price")}
            className="form-control mb-4"
            onChange={handleChange}
          />
        </div>

        {/* description */}
        <div className="mb-4">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <input
            type="text"
            {...register("description")}
            className="form-control mb-4"
            onChange={handleChange}
            />

        </div>

        <button className='btn btn-warning text-white d-block mx-auto' type="submit">Add Product</button>

        </div>

    </form>


    </div>
    
  )
}

export default AddProducts