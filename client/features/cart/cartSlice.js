import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
 
// const token = window.localStorage.getItem(TOKEN)

export const getCart = createAsyncThunk("getCart/", async(userId)=>{
   try{
       const {data} = await axios.get(`/api/cart/${userId}`)
       return data
   }catch(error){
       console.log("Error in getCart thunk", error)
   }
})

export const getCart2 = createAsyncThunk("getCart2/", async(userId)=>{
    console.log("HELLO From get cart2 thunk", userId)
    try{
        const {data} = await axios.get(`/api/cart/${userId}/cart`)
        return data
    }catch(error){
        console.log("Error in getCart2 thunk", error)
    }
 })

export const editCartAsync = createAsyncThunk("editCart", async (cart) => {
      
    const { data } = await axios.put(`/api/cart/${cart.cartId}`, cart);
    return data;
  });


 
const initialState =[]
const cart = createSlice({
   name: "cart",
   initialState,
   reducers: {
 
   },
   extraReducers: (builder)=>{
       builder.addCase(getCart.fulfilled, (state, action)=>{
           return action.payload
       }),
       builder.addCase(getCart2.fulfilled, (state, action)=>{
        return action.payload
    })
   },
   
})
 
 
export const selectCart = (state)=>{
   return state.cart
}
 
 
export default cart.reducer
