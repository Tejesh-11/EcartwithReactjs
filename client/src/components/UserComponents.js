import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function UserComponents() {
  return (
    <div>
      
      <ul className="nav  bg-light justify-content-end fs-4 p-3 mt-3">
        <li className="nav-item">
          <NavLink className="nav-link" to="">
            Products
          </NavLink>
        </li>       
        
        <li className="nav-item">
          <NavLink className="nav-link" to="cart">
            Cart
          </NavLink>
        </li>
      </ul>
      {/* placeholder for components */}
      <Outlet />
    </div>
  );
}

export default UserComponents;
