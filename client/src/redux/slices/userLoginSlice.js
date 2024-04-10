import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios'

 export const userLoginLifeCycle=createAsyncThunk('user-login',async(userCred,thunkApi)=>{
    try{
    let res=await axios.post('http://localhost:4000/user-api/login',userCred)
    console.log(res);
    
    if(res.data.message=='login success'){
    //save token in local/session storage
    sessionStorage.setItem('token',res.data.token)
    return {...res.data,userType:userCred.userType}
    }else{
        return thunkApi.rejectWithValue(res.data.message)
    }
    return res.data;
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


export const sellerLoginLifeCycle=createAsyncThunk('seller-login',async(userCred,thunkApi)=>{
    try{
    let res=await axios.post('http://localhost:4000/seller-api/login',userCred)
    console.log(res);
    
    if(res.data.message=='login success'){
    //save token in local/session storage
    sessionStorage.setItem('token',res.data.token)
    return {...res.data,userType:userCred.userType}
    }else{
        return thunkApi.rejectWithValue(res.data.message)
    }
    return res.data;
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


export const LoginSlice=createSlice({
    name:'login',
    initialState:{currentUser:{},loginStatus:false,errorMessage:'',isPending:false},
    reducers:{
        clearState:(state,action)=>{
            state.currentUser={};
            state.loginStatus=false;
            state.errorMessage='';
            state.isPending=false;
        }
    },
    extraReducers:(builder)=>
    builder
    .addCase(userLoginLifeCycle.pending,(state,action)=>{
    //action.payload.message
    state.isPending=true;
    })
    .addCase(userLoginLifeCycle.fulfilled,(state,action)=>{
      state.currentUser=action.payload.user;
      state.loginStatus=true;
      state.errorMessage='';
      state.isPending=false;
    })
    .addCase(userLoginLifeCycle.rejected,(state,action)=>{
    //action.payload
    state.currentUser={};
    state.loginStatus=false;
    state.errorMessage=action.payload;
    state.isPending=false;
    })


    //sellerlogincycle

    .addCase(sellerLoginLifeCycle.pending,(state,action)=>{
        //action.payload.message
        state.isPending=true;
        })
        .addCase(sellerLoginLifeCycle.fulfilled,(state,action)=>{
          state.currentUser=action.payload.seller;
          state.loginStatus=true;
          state.errorMessage='';
          state.isPending=false;
        })
        .addCase(sellerLoginLifeCycle.rejected,(state,action)=>{
        //action.payload
        state.currentUser={};
        state.loginStatus=false;
        state.errorMessage=action.payload;
        state.isPending=false;
        })
    
})

//export actions
export const {clearState}=LoginSlice.actions;
//export root reducer 
export default LoginSlice.reducer; 

