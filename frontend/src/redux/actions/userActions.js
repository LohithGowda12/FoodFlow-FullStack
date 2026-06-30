import api from "../../utils/api"

import{
    userRequest,
    userSuccess,
    userFail,
    logoutFail,
    logoutSuccess,
    updateFail,
    updateRequest,
    updateSuccess,
    updateReset,
    clearError
}from "../slices/userSlice"

//login
export const login =(email,password) => async(dispatch) =>{
    try{
        dispatch(userRequest())
        const {data}= await api.post("/v1/users/login", {email,password})
        dispatch(userSuccess(data.data.user))

    }catch(error){
        dispatch(userFail("login failed"))
    }
}

//signup/register
export const register =(userData) => async(dispatch)=>{
    try{
        dispatch(userRequest());
        const {data} = await api.post("/v1/users/signup", userData,{
            headers:
            {"content-Type":"application/json"}
        })

        dispatch(userSuccess(data.data.user))
    }catch(error){
        dispatch(userFail(error.response?.data?.message))
    }
}

//load User

export const loadUser =() =>async(dispatch)=>{
    try{
        dispatch(userRequest());
        const {data} = await api.get("/v1/users/me")
        dispatch(userSuccess())

    }catch(error){
        dispatch(userFail(error.response?.data?.message))
    }
}

//Update profile
export const updateProfile = (userData) => async(dispatch) =>{
    try{
        dispatch(updateRequest());
        const {data} = await api.put("/v1/users/me/update", userData,{
            headers:
            {"content-Type" : "multipart/form-data"}
        })
        dispatch(updateSuccess(data.success))
    }catch(error){
        dispatch(updateFail(error.response?.data?.message))
    }
}

//logout

export const logout =() => async(dispatch) =>{
    try{
        await api.get("/v1/users/logout")
        dispatch(logoutSuccess)
    }catch(error){
        dispatch(logoutFail(error.response?.data?.message))
    }
}