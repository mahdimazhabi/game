import axios from "axios";

const API_URL =
    import.meta.env.VITE_API_URL || "http://217.154.71.28/api"; // مقدار پیش‌فرض

const useUserApi = () => {
    const getDataUserById = async (id) => {
        try {
            const response = await axios.post(
                `${API_URL}/Users/GetById`,
                {userId: id},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response?.data?.users) {
                localStorage.setItem("userId", id);
                return response.data.users;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return {getDataUserById};
};

export default useUserApi;
