import api from "../../utils/api"

import{
    userRequest,
    usersuccess,
    userFail,
    logoutFail,
    logoutSuccess,
    updateFail,
    updateRequest,
    updateSuccess,
    updateReset,
    clearerror
}from "../slices/userSlice"

//login
export const login =(email,password) => asynch(dispatch) =>{
    try{
        dispatch(userRequest())
        const {data}= await api.post("/v1/users/login", {email,password})
        dispatch(userSuccess(data.data.user))

    }catch(error){
        dispatch(userFail("login failed"))
    }
}

//signip/register
export const register =(userData) => async(dispatch)=>{
    try{
        dispatch(userRequest());
        const {data} = await api.post("/vi/users/signup", userData,{
            headers:
            {"content-Type":"application/json"}
        })
    }catch(error){
        dispatch(userFail(error.response?.data?.message))
    }
}



// 30 min