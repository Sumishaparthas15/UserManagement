import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token
        const response = await axios.get("http://127.0.0.1:8000/app1/profile/", {
          headers: { Authorization: `Token ${token}` },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold">All Users</h2>

        {users.length > 0 ? (
          <ul className="mt-4">
            {users.map((user) => (
              <li key={user.id} className="p-2 border-b">
                <p className="font-bold">{user.username}</p>
                <p className="text-gray-600">{user.email}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}

        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
