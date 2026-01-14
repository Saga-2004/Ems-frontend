import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urls from "../../../Common/routes";

export default function Header() {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // ✅ 1. Logout function
  function handleLogOut() {
    localStorage.removeItem("token");
    setUser(null);
    setUserEmail(null);
    setUserRole(null);
    navigate("/");
  }

  // ✅ 2. Verify Token on page load
  async function verifyUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      // Decode token safely
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Optional: check expiry
      const currentTime = Date.now() / 1000;
      if (payload.exp && payload.exp < currentTime) {
        console.log("Token expired");
        handleLogOut();
        return;
      }

      // ✅ verify with backend (optional but good)
      const res = await fetch(urls.getMyTasks.url, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        console.log("Payload: ", payload);

        setUser(payload.name);
        setUserEmail(payload.email);
        setUserRole(payload.role);
      } else {
        // token invalid on backend side
        handleLogOut();
      }
    } catch (error) {
      console.log("Error decoding token:", error.message);
      handleLogOut();
    }
  }
  
  useEffect(() => {
    verifyUser();
  }, []);

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return "G";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left Side - User Info */}
          <div className="flex items-center space-x-4">
            {/* User Avatar */}
            <div className="relative">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg ring-4 ring-cyan-100">
                {getInitials(user)}
              </div>
              {userRole && (
                <span className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>

            {/* User Details */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-xs sm:text-sm text-gray-500 font-medium">
                  Welcome back,
                </span>
              </div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                {user || "Guest"}
              </h1>
              {userEmail && (
                <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[200px] sm:max-w-none">
                  {userEmail}
                </p>
              )}
            </div>

            {/* Role Badge */}
            {userRole && (
              <div className="hidden sm:flex">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    userRole === "admin"
                      ? "bg-purple-100 text-purple-700 border border-purple-200"
                      : "bg-blue-100 text-blue-700 border border-blue-200"
                  }`}
                >
                  {userRole === "admin" ? "👑 Admin" : "👤 Employee"}
                </span>
              </div>
            )}
          </div>

          {/* Right Side - Logout Button */}
          <div className="flex items-center space-x-3">
            {/* Logout Button */}
            <button
              onClick={handleLogOut}
              className="group relative flex items-center space-x-2 px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-sm sm:text-base">Log Out</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
