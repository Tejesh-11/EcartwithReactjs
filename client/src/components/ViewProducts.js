import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProductName, setEditedProductName] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const currentUser = useSelector((state) => state.login.currentUser);
  console.log(currentUser)
  

  let fetchProducts = async () => {
    const res = await axios.get(`http://localhost:4000/product-api/products`);
    setProducts(res.data.payload);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (productname) => {
    await axios.delete(`http://localhost:4000/product-api/product/${productname}`);
    setProducts(products.filter((i) => i.productname !== productname));
  };

  const saveEditedProduct = async () => {
    // Update product details in the backend
    await axios.put(`http://localhost:4000/product-api/product/${editingProduct.productname}`, {
      productname: editedProductName,
      price: editedPrice,
      description: editedDescription
    });

    // Update product details in the UI
    const updatedProducts = products.map((product) => {
      if (product.productname === editingProduct.productname) {
        return {
          ...product,
          productname: editedProductName,
          price: editedPrice,
          description: editedDescription
        };
      }
      return product;
    });
    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditedProductName(product.productname);
    setEditedPrice(product.price);
    setEditedDescription(product.description);
  };

  const addToCart= async (product)=>{
    await axios.put(`http://localhost:4000/user-api/addcart`,{
      username:currentUser.username,
      product:product
    })
    alert("Product added to cart..")
  }


  


  return (
    <div className="container row row-cols-1 row-cols-md-3 g-4 mb-3">
      {products.map((product, index) => (
        <div className="col" key={index}>
          <div className="card bg-light">
            <div className="card-body">
              {editingProduct === product ? (
                <div>
                  <input
                    type="text"
                    value={editedProductName}
                    onChange={(e) => setEditedProductName(e.target.value)}
                  />
                  <br />
                  <input
                    type="text"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                  />
                  <br />
                  <input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <h5 className="card-title">{product.productname}</h5>
                  <p className="card-text">Price: {product.price}</p>
                  <p className="card-text">Description: {product.description}</p>
                </div>
              )}
            </div>
            <div className="card-footer">
              {currentUser.userType==="seller" && (
                <>
                {editingProduct === product ? (
                  
                  <button onClick={saveEditedProduct} className="btn btn-success me-3">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(product)} className="btn btn-primary me-3">
                    Edit
                  </button>
                )}
                <button onClick={() => deleteProduct(product.productname)} className="btn btn-danger">
                  Delete
                </button>
                </>
              )}

              {currentUser.userType==="user" && (
                <button onClick={() => addToCart(product)} className="btn btn-success">
                Add to cart
              </button>
              )}
               
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewProducts;