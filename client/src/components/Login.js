import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLoginLifeCycle,sellerLoginLifeCycle } from "../redux/slices/userLoginSlice";


function Login() {
  let { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [loginType,setLoginType]=useState("user");
  const {currentUser,loginStatus,errorMessage,isPending,} = useSelector(state=>state.login)
  
  const handleLoginTypeChange = (e) => {
    setLoginType(e.target.value);
  };
  
  const onUserLogin = (userCred) => {
    if(loginType==="user")
    {
      dispatch(userLoginLifeCycle({...userCred,userType:loginType}));
    }
    else if(loginType==="seller")
    {
      dispatch(sellerLoginLifeCycle({...userCred,userType:loginType}));
    }
   
  };
  console.log(loginStatus)
  
  //navigate to user-profile when userLogin status is changed to true
  useEffect(()=>{
    if(loginStatus===true){
      console.log("hello")
      if(loginType==="user"){
        navigate('/user-login');
      }
      else if(loginType==="seller"){
        navigate('/seller-login');
      }
    }
  },[loginStatus])



  return (
    <div>
      {errorMessage.length!=0&&<p className="text-danger text-center fs-3">{errorMessage}</p>}
      <form
        className="w-50 mx-auto text-white mb-3 p-3 mt-4"
        onSubmit={handleSubmit(onUserLogin)}>
        
        <div>
        
            <input type="radio" name="loginType" value="user"
              checked={loginType === "user"}
              onChange={handleLoginTypeChange}/>
              <label>User</label>&ensp;
        &ensp;&ensp;&ensp;

      
            <input
              type="radio" name="loginType" value="seller"
              checked={loginType === "seller"}
              onChange={handleLoginTypeChange}/>
              <label>Seller</label>&ensp;
        </div>
        
        {loginType === "user" ? (
        <div>
          <h1 className="text-white text-center">User Login</h1>
        {/* username */}
        <div className="mb-4">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            {...register("username")}
            className="form-control "
          />
        </div>

        {/* password */}
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="form-control mb-4"
          />
        </div>
        </div>

        ):(

        <div>
        <h1 className="text-white text-center">Seller Login</h1>
        {/* username */}
        <div className="mb-4">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" {...register("username")} className="form-control "/>
        </div>

        {/* password */}
        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" {...register("password")} className="form-control mb-4"/>
        </div>  
        </div>
        )}



        <button className="btn btn-warning text-white d-block mx-auto">Login</button>
      </form>
    
    </div>
  );
}

export default Login;
