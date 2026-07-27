import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (error) {
      alert("Please login first");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully");

    navigate("/login");
  };

  if (!user) {
    return (
      <h1 className="text-center mt-20 text-2xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <p className="mb-4">
        <strong>Name:</strong> {user.name}
      </p>

      <p className="mb-4">
        <strong>Email:</strong> {user.email}
      </p>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;