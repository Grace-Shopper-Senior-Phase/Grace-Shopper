import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { selectUsers } from "../usersadmin/usersSlice";
import { fetchUsersAsync } from "../usersadmin/usersSlice";
import { deleteSingleUserAsync } from "../usersadmin/usersSlice";
import { deleteSingleCartAsync } from "../usersadmin/usersSlice";


const AllUsersAdmin = () => {
  const users = useSelector(selectUsers);

  const dispatch = useDispatch()

  const handleDelete = (userId) => {
    dispatch(deleteSingleCartAsync(userId)).then(()=>dispatch(deleteSingleUserAsync(userId))).then(()=>dispatch(fetchUsersAsync()))
  }

  useEffect(() => {
    dispatch(fetchUsersAsync());
  },[dispatch]);

  return (
    <div id="allUsers">
      <ul>
        {users.map((user) => (
          <li>
            <Link href={`/users/${user.id}`}>
              <p>{user.username}</p>
            </Link>
            <button onClick={() => handleDelete(user.id)}>Delete User</button>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default AllUsersAdmin