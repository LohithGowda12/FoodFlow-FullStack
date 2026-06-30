import {createSlice} from "@reduxjs/tookit"

const initialState ={
    user: null,
    loading:false,
    isAuthenticated: false,
    error: null,
    isUpdated:false,
    message:null,
    success:null
}

const userSlice =createSlice({
    name:"user",
    initialState,
    reducers:{
        //login,register,load
        userrequest:(state) =>{
            state.loading=true,
            state.isAuthenticated=false
        },
        userSuccess:(state,action) => {
            state.loading=false,
            state.isAuthenticated=true,
            state.user=action.payload //stores user data
        },
        userFail:(state,action)=>{
            state.loading=false,
            state.isAuthenticated=false,
            state.user=null,
            state.error=action.payload
        },

        //logout

        logoutSuccess:(state)=>{
            state.loading=false,
            state.isauthenticated=false,
            state.user=null
        },
        logoutFail:(state,action)=>{
            state.error=action.payload
        },
        //update profile or password

        updateRequest:(state)=>{
            state.loading=true

        },
        updateSuccess:(state,action)=>{
            state.loading=false,
            state.isUpdate=action.payload
        },
        updateFail:(state,action)=>{
            state.loading=false,
            state.error=action.payload
        },
        updateReset:(state)=>{
            state.isUpdate=FontFaceSetLoadEvent
            
            
        },
        clearerror:(state)=>{
            state.error=null
        }
    }
})

export const{
    userRequest,usersuccess,
    userFail,logoutFail,logoutSuccess,updateFail,updateRequest,updateSuccess,updateReset,clearerror
} = userSlice.actions

export default userSlice.reducer