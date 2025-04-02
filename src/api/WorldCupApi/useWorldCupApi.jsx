import axios from "axios";

const BASE_URL = "http://217.154.71.28/api/UserWorldCups"; // آدرس API
const ADMIN_BASE_URL = "http://217.154.71.28/api/WorldCups"; // آدرس API

const useFootballApi = () => {
    const getTeamsByLevel = async (level) => {
        try {
            const response = await axios.post(`${ADMIN_BASE_URL}/GetByLevelNotPastDeadline`,
                {
                    level: level,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.error("Error getting teams of level ", level, error);
        }
    };

    const getCorrectPredictions = async (userId) => {
        try {
            const response = await axios.post(`${BASE_URL}/GetCorrectCountByUserId`,
                {
                    userId: userId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.error("Error getting correct prediction of user:", error);
        }
    };

    const getTeamsAlreadyPredicted = async (userId) => {
        try {
            const response = await axios.post(`${BASE_URL}/GetByUserId`,
                {
                    userId: userId,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.error("Error getting last predictions of user:", error);
        }
    };

    const addPrediction = async (data) => {
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
            console.error("Error adding prediction:", error);
        }
    };

    const editPrediction = async (data) => {
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
            console.error("Error editing prediction:", error);
        }
    };
    return {
        getTeamsByLevel,
        getCorrectPredictions,
        getTeamsAlreadyPredicted,
        addPrediction,
        editPrediction
    };
};

export default useFootballApi;
