import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

const useUserId = () => {
    const [searchParams] = useSearchParams();
    const userIdFromUrl = searchParams.get("userId");

    const [userId, setUserId] = useState(() => localStorage.getItem("userId"));

    useEffect(() => {
        if (userIdFromUrl) {
            localStorage.setItem("userId", userIdFromUrl);
            setUserId(userIdFromUrl);
        }
    }, [userIdFromUrl]);

    return userId;
};

export default useUserId;
