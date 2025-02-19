import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/app1/profile/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        handleRefreshToken(); // Try refreshing token
      }
    };

    fetchUser();
  }, [navigate]);

  const handleRefreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await axios.post("http://127.0.0.1:8000/app1/refresh/", {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;
      localStorage.setItem("access_token", newAccessToken);

      axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
      window.location.reload(); // Reload page to retry fetching profile
    } catch (error) {
      console.error("Token refresh failed:", error);
      handleLogout();
    }
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      await axios.post("http://127.0.0.1:8000/app1/logout/", { refresh_token: refreshToken });

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
