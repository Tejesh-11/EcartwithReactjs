import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Register() {
  let { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  let [error, setError] = useState("");
  let [userType, setUserType] = useState("user"); // Default user type is "user"
  let [file,setFile]=useState(null);


  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    console.log("User selected:",e.target.value);
  };

  function uploadPic(e){
    console.log(e)
    setFile(e.target.files[0])
  }

  const onRegister=async(userObj) =>{

    const formData=new FormData();
    formData.append('userObj',JSON.stringify(userObj))
    formData.append('pic',file)

    try {
      let res;
      if (userType === "user") {
        // Registration for user
        console.log("Registering as a user...")
        res = await axios.post("http://localhost:4000/user-api/user", formData);
      } else if (userType === "seller") {
        // Registration for seller
        console.log("Registering as a seller...")
        res = await axios.post("http://localhost:4000/seller-api/seller", userObj);
      }

      if (res.status === 201) {
        navigate("/login");
      } else if(res.status===200){
        setError(res.data.message);
      }
      else{
        setError("Registration Failed..")
      }
       
    } catch (err) {
      setError(err.message);
    }
  };
 
  

  return (
    <div>
      {/* http req error message */}
      {error.length !== 0 &&  (<p className="fs-1 text-center text-danger">{error}</p>)}
      <form className="w-50 mx-auto text-white mb-3 p-3 mt-4" onSubmit={handleSubmit(onRegister)}>
        <div>
            <input type="radio" name="userType" value="user"
              checked={userType === "user"}
              onChange={handleUserTypeChange}/><label>User</label>&ensp;
        &ensp;&ensp;&ensp;

            <input
              type="radio" name="userType" value="seller"
              checked={userType === "seller"}
              onChange={handleUserTypeChange}/><label>Seller</label>&ensp;
        </div>
        
        {userType === "user" ? (
        <div>
          <h1 className="text-white text-center">User Registration</h1>
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

        {/* email */}
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="form-control mb-4"
          />
        </div>

        {/* address */}
        <div className="mb-4">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            {...register("address")}
            className="form-control mb-4"
          />
        </div>

        {/*profile image*/}
        <div className="mb-4">
          <label htmlFor="profile-pic" className="form-label">
            Profile Image
          </label>
          <input id="profile-pic" type="file" name="pic" className="form-control mb-4" onChange={uploadPic}/>
        </div>
        

        </div>
        ):(
        <div>
        <h1 className="text-white text-center">Seller Registration</h1>
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

        {/* email */}
        <div className="mb-4">
          <label htmlFor="email" className="form-label"> Email</label>
          <input type="email" {...register("email")} className="form-control mb-4"/>
        </div>



        {/* Company name */}
        <div>
        <select {...register("companyname")}>
          <option value="companyname">--Company Name--</option>
          <option value="sony">Sony</option>
          <option value="lenovo">Lenovo</option>
          <option value="hp">HP</option>
        </select>
        </div>
        
        </div>
        )}
        <br></br>
         


        <button type="submit" className="btn btn-warning text-white d-block mx-auto">Register</button>
      </form>
    </div>
  );
}

export default Register;
