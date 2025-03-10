import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://asp-backend-proxy.chbk.app/api"; // مقدار پیش‌فرض

const useUserApi = () => {
  const getDataUserById = async (id) => {
    try {
      const response = await axios.post(
        `${API_URL}/Users/GetById`,
        { userId: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.users) {
        localStorage.setItem("iduser", id);
        console.log(response);
        return response.data.users;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return { getDataUserById };
};

export default useUserApi;
