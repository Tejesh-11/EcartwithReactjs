import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearState } from "../redux/slices/userLoginSlice"; 

function Header() {

  const loginStatus = useSelector((state) => state.login.loginStatus);
  const dispatch = useDispatch();

  const userLogout = () => {
    // Clear state and remove token from storage
    dispatch(clearState());
    sessionStorage.removeItem('token');
  };


  return (
    <>
    <ul className='nav bg-dark p-4 justify-content-end text-white'>
    {loginStatus===false?<>
      <li className='nav-item'>
            <NavLink className='nav-link' to="">Home</NavLink>
        </li>
        <li className='nav-item'>
            <NavLink className='nav-link' to="register">Register</NavLink>
        </li> 
        <li className='nav-item'>
            <NavLink className='nav-link' to="login">Login</NavLink>
        </li>
        </>:<li className='nav-item' onClick={userLogout}>
            <NavLink className='nav-link' to="login">Logout</NavLink>
        </li>}
    
    </ul>
    </>
  );
}

export default Header;
