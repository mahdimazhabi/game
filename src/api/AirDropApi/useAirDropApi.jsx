import axios from "axios";

const useAirDropApi = () => {
    const edit = async (points, id) => {
        try {
            const response = await axios.put(
                `https://asp-backend-proxy.chbk.app/api/AirDrops/Edit`,
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
                "https://asp-backend-proxy.chbk.app/api/AirDrops/GetById",
                {airDropId: id},
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

    return {edit, getdatabyid};
};

export default useAirDropApi;
