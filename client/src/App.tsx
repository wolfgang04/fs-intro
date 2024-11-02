import { useEffect, useState } from "react";
import UserAuth from "./Pages/UserAuth";
import { Route, Routes } from "react-router";
import Posts from "./Pages/Posts";
import Profile from "./Pages/Profile";
import axios from "axios";

export default function App() {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [userID, setUserID] = useState<string>("");
  let res: any;

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      res = await axios.get("http://localhost:6062/api/user/auth/status", {
        withCredentials: true,
      });

      if (res.status == 200) {
        setUserID(res.data);
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      if (error.response) {
        setUserID("");
        setIsLoggedIn(false);
      }
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn == true ? <Posts /> : <UserAuth onLogIn={handleLogin} />
        }
      />
      <Route path="/:username" element={<Profile loggedInUser={userID} />} />
    </Routes>
  );
}
