import axios from "axios";

const useAirDropApi = () => {
  const edit = async (points) => {
    try {
      const response = await axios.put(
        `http://217.154.71.28/api/AirDrops/Edit`,
        {
          airDropId: 22,
          points: points,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error while editing AirDrop:", error.response?.data);
      throw error;
    }
  };
  const getdatabyid = async (id) => {
    try {
      const response = await axios.post(
        "http://217.154.71.28/api/AirDrops/GetById",
        { airDropId: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        return response.data;
      }
    } catch {
      console.error("Error while editing AirDrop:");
    }
  };

  return { edit, getdatabyid };
};

export default useAirDropApi;
