import axios from "axios";

const BASE_URL = "http://217.154.71.28/api/LevelCoinCounts"; // آدرس API
const ADMIN_BASE_URL = "http://217.154.71.28/api/Gifts"; // آدرس API

const useGiftApi = () => {
    const getAllGifts = async () => {
        try {
            const response = await axios.post(`${ADMIN_BASE_URL}/GetAllActive`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data.gifts;
            }
        } catch (error) {
            console.error("Error getting gifts:", error);
        }
    };
    const addCoin = async (data) => {
        try {
            const response = await axios.post(`${BASE_URL}/Add`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.error("Error adding coin:", error);
        }
    };

    const editCoin = async (data) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/Edit`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.error("Error editing coin:", error);
        }
    };

    const getAllUsersCoins = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/GetAll`,
                {
                    userId: parseInt(localStorage.getItem("userId")),
                    competitionTypeId: 2,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data.levelCoinCounts;
            }
        } catch (error) {
            console.log("error getting user coins:", error);
        }
    };

    return {
        addCoin,
        editCoin,
        getAllGifts,
        getAllUsersCoins,
    };
};

export default useGiftApi;
