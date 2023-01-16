import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom"
import { selectSingleUser } from "../usersadmin/singleUserSlice";
import { fetchSingleUserAsync } from "../usersadmin/singleUserSlice";
import { deleteSingleUserAsync } from "../usersadmin/usersSlice";
import { deleteSingleCartAsync } from "../usersadmin/usersSlice";



const SingleUser = () => {

    const navigate = useNavigate()

    const { id }  = useParams()


  const user = useSelector(selectSingleUser);
  console.log("USER: ", user)

  const dispatch = useDispatch()

  const handleDelete = (userId) => {
    dispatch(deleteSingleCartAsync(userId)).then(()=>dispatch(deleteSingleUserAsync(userId))).then(navigate('/home', {replace: true}))
  }

  useEffect(() => {
    dispatch(fetchSingleUserAsync(id))
  },[dispatch]);

  return (
    <div id="user">
            <p>{user.username}</p>
            <button onClick={() => handleDelete(user.id)}>Delete User</button>
    </div>
        )}
      
export default SingleUser