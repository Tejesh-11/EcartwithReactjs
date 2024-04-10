import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function SellerComponents() {
  return (
    <div>
      <ul className="nav bg-light justify-content-end fs-4 p-3 mt-3">
        <li className="nav-item">
          <NavLink className="nav-link" to="">
           Add Product
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="viewproducts">
            Products
          </NavLink>
        </li>
      </ul>
      {/* placeholder for components */}
      <Outlet />
    </div>
  );
}

export default SellerComponents;
