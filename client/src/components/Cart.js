import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const currentUser = useSelector((state) => state.login.currentUser);
  
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    
      const res = await axios.get(`http://localhost:4000/user-api/cart/${currentUser.username}`);
      setCartItems(res.data.payload);
    
  };

  const removeCartItem = async (productName) => {
      await axios.put(`http://localhost:4000/user-api/removecart`, {
        username: currentUser.username,
        productName: productName
      });
      // Refresh cart items after removal
      fetchCartItems()
  };

  return (
    <div className="container row row-cols-1 row-cols-md-3 g-4 mb-3">
      {cartItems.map((item, index) => (
        <div className="col" key={index}>
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title">{item.productname}</h5>
              <p className="card-text">Price: {item.price}</p>
              <p className="card-text">Description: {item.description}</p>
            </div>
            <div className="card-footer">
              <button onClick={() => removeCartItem(item.productname)} className="btn btn-danger">
                Remove from cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;