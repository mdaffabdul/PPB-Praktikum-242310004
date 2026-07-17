import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileTugas8 from "@/components/module_tugas/tugas8/profile";
import SignInTugas8 from "@/components/module_tugas/tugas8/signin";

export default function AccountTabRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const data = await AsyncStorage.getItem("userData");
      setIsLoggedIn(!!data);
    };
    checkLogin();
    const interval = setInterval(checkLogin, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoggedIn === null) return null; // Loading state

  return isLoggedIn ? <ProfileTugas8 /> : <SignInTugas8 />;
}
