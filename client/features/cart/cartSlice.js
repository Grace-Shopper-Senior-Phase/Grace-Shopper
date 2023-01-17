


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
 
// const token = window.localStorage.getItem(TOKEN)

// export const getCart = createAsyncThunk("getCart/", async(userId)=>{
//    try{
//        const {data} = await axios.get(`/api/cart/${userId}`)
//        return data
//    }catch(error){
//        console.log("Error in getCart thunk", error)
//    }
// })

export const getCartAsync = createAsyncThunk("getCart", async (userId)=>{
    try{
        const { data } = await axios.get(`/api/cart/${userId}/cart`)
        return data
    }catch(error){
        console.log("Error in getCart thunk", error)
    }
 })

export const editCartAsync = createAsyncThunk("editCart", async (cart) => {
      try{
    const { data } = await axios.put(`/api/cart/${cart.cartId}`, cart);
    return data;
      }catch(error){
        console.log("ERROR in EDIT CART THUNK")
      }
  });

  export const removeFromCartAsync = createAsyncThunk("removeFromCart", async (info) => {
    try{
         const { data } = await axios.put(`/api/cart/remove/${info.meId}`, info);
         return data;
      }catch(error){
        console.log("ERROR in REMOVE FROM CART THUNK")
        
      }
  });

 
const initialState =[]
const cart = createSlice({
   name: "cart",
   initialState,
   reducers: {
 
   },
   extraReducers: (builder) => {
       builder.addCase(getCartAsync.fulfilled, (state, action)=>{
           return action.payload
       }),
    //    builder.addCase(getCart2.fulfilled, c(state, action)=>{
    //     return action.payload
    // })
    builder.addCase(removeFromCartAsync.fulfilled, (state, action)=>{
        return action.payload
    }),
    builder.addCase(editCartAsync.fulfilled, (state, action)=>{
        return action.payload
    })
   }
})
 
 
export const selectCart = (state)=>{
   return state.cart
}
 
 
export default cart.reducer
