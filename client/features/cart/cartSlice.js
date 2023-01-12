import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
 
// const token = window.localStorage.getItem(TOKEN)

export const getCart = createAsyncThunk("getCart/", async(userId)=>{
   console.log("HELLO From get cart thunk", userId)
   try{
       const {data} = await axios.get(`/api/cart/${userId}/cart`)
       return data
   }catch(error){
       console.log("Error in getCart thunk", error)
   }
})

 
const initialState =[]
const cart = createSlice({
   name: "cart",
   initialState,
   reducers: {
 
   },
   extraReducers: (builder)=>{
       builder.addCase(getCart.fulfilled, (state, action)=>{
           return action.payload
       })
   }
})
 
 
export const selectCart = (state)=>{
   console.log("Hit Select Cart")
   return state.cart
}
 
 
export default cart.reducer