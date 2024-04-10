import { useSelector} from "react-redux";
import axios from 'axios';

function UserProfile() {

  const currentUser = useSelector((state) => state.login.currentUser);
  
  const getDataFromProtectedRoute=async()=>{

    //get token from local/session storage
    const token=sessionStorage.getItem('token')

    //add token to headers of req object
    let axiosWithToken=axios.create({
      baseURL:'http://localhost:4000',
      headers:{
        Authorization:`Bearer ${token}`
      }
  })
  
    //make request
    let res=await axiosWithToken.get('http://localhost:4000/user-api/protected')
    console.log(res)

  }


  return (
    <div className="text-end p-4">
      <p>User profile</p>
      {currentUser && currentUser.userType==="seller" && (
      <p className="text-success fs-6">{currentUser.username}</p> )}
      <button className="btn btn-success" onClick={getDataFromProtectedRoute}>Get Protected data</button>
    </div>
  );
}

export default UserProfile;
