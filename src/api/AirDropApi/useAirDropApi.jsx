import axios from "axios";

const useAirDropApi = () => {

    const add = async (id) => {
        try {
            const date = new Date();
            const response = await axios.post(
                `http://217.154.71.28/api/AirDrops/Add`,
                {
                    userId: id,
                    points: 0,
                    date: date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getDate() + 1)
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.airDropId;
        } catch (error) {
            console.error("Error while adding AirDrop:", error.response?.data);
            throw error;
        }
    };
    const edit = async (points, id) => {
        try {
            const response = await axios.put(
                `http://217.154.71.28/api/AirDrops/Edit`,
                {
                    airDropId: id,
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
                "http://217.154.71.28/api/AirDrops/GetByUserId",
                {userId: id},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response) {
                return response.data.airDrops;
            }
        } catch {
            console.error("Error while editing AirDrop:");
        }
    };

    return {edit, getdatabyid, add};
};

export default useAirDropApi;
