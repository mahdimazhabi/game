import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useUserId = () => {
  const [searchParams] = useSearchParams();
  const userIdFromUrl = searchParams.get("user_id");

  const [userId, setUserId] = useState(() => localStorage.getItem("user_id"));

  useEffect(() => {
    if (userIdFromUrl) {
      localStorage.setItem("user_id", userIdFromUrl);
      setUserId(userIdFromUrl);
    }
  }, [userIdFromUrl]);

  return userId;
};

export default useUserId;
