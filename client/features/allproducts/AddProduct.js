import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAsync, fetchProductsAsync } from "./productsSlice";

const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState("")
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNaN(price)){ alert("please input number in price field")}
    if (name === "" ){alert("please provide product name")}
    dispatch(addProductAsync({ name, price, description, imageUrl, quantity })).then(()=>{dispatch(fetchProductsAsync())})
  };
  

  return (
    <form id="productForm" onSubmit={handleSubmit}>
      <label htmlFor="imageUrl">Image Url:</label>
      <input
        name="imageUrl"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <label htmlFor="name">Name:</label>
      <input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="price">Price:</label>
      <input
        name="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label htmlFor="description">Description:</label>
      <input
        name="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="quantity">Quantity:</label>
      <input
        name="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button type="submit">Add Product</button>
      
    </form>
  );
};

export default AddProduct;