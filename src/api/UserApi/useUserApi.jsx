import axios from "axios";

const useUserApi = () => {
  const getDataUserById = async (id) => {
    try {
      const response = await axios.post(
        "http://217.154.71.28/api/Users/GetById",
        {
          userId: id,
        },
        {
          headers: {
            headers: {
              "Content-Type": "application/json",
            },
          },
        }
      );
      localStorage.setItem("iduser", id);
      if (response) {
        return response.data.users;
      }
    } catch {
      console.log("error");
    }
  };
  return { getDataUserById };
};

export default useUserApi;
