import React, { useEffect, useState } from "react";
import useStore from "../store/index"; // Import the zustand store

function Recruiting() {
  const [users, setUsers] = useState([]);
  const { setError, isLoading, setLoading } = useStore();

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/recruiting", {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Cookies in the browser:", document.cookie);
      console.log(data);

      if (response.ok) {
         // Assuming the backend sends { users: [...] }
        setUsers(data.users);
      } else {
        throw new Error(data.error || "Failed to fetch users");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="recruiting-container">
      <h2>Recruiting</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {" "}
              {/* Use user.id or another unique identifier */}
              <p>{user.name}</p>
              <p>{user.email}</p>
              {/* Display other user details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recruiting;
