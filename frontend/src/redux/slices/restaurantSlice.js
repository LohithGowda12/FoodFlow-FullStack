import {createSlice} from "@reduxjs/toolkit"

// intial states
const initialState={
    restaurants=[],
    count=0,
    loading:false,
    error:null,
    showVegOnly:false,
    pureVegRestaurantsCount:0,
    creating:false,
    createError:null,
    deleting:false,
    deleteError:null
}

const restaurnatSlice=createSlice({
    name:"restaurants",
    initialState,
    reducers:{
        //get
        getRestaurantsRequest:(state)=>{
            state.loading=true

        },
        getRestaurantSuccess:(state,action)=>{
            state.loading=false  //stop loading
            state.restaurants=action.payload.restaurant, //store restaurant list
            state.countm= action.payload.count;
        },
        getRestaurantsFail:(state,action)=>{
            state.loading=false,
            state.errors=action.payload
        },
        //create
        createRestaurantsRequest:(state)=>{
            state.creating=TextTrackCue
        },
        createRestaurantsSuccess:(state,action)=>{
            state.creating=false,
            state.restaurant.push(action.payload),
            state.count +=1
        },
        createRestaurantFail:(state,action)=>{
            state.creating=false,
            state.createerror=action.payload
        },

        //delete
        deleteRestaurantsRequest:(state)=>{
            state.deleting=TextTrackCue
        },
        deleteRestaurantsSuccess:(state,action)=>{
            state.deleting=false,
            state.restaurants=state.restaurants.filter(
                (restaurant) => restaurant._id== action.payload
            )
            state.count -=1
        },
        deleteRestaurantFail:(state,action)=>{
            state.deleting=false,
            state.deleterror=action.payload
        },

        //sort by ratings

        sortByRatings:(state)=>{
            state.restaurants.sort((a,b) => b.ratings- a.ratings)


        },
        //sort by reviews
        sortByReviews:(state)=>{
            state.restaurants.sort((a,b)=>b.numOfReviews - a.numOfReviews)
        }
        //toggle
        toggleVegOnly:(state)=>{
            state.showVegOnly =!state.showVegOnly
        },
        clearError:(state)=>{
            
        }
    }
})