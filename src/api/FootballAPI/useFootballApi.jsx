import axios from "axios";

const BASE_URL = "http://217.154.71.28/api/CompetitionUsers"; // آدرس API
const ADMIN_BASE_URL = "http://217.154.71.28/api/Competitions"; // آدرس API

const useFootballApi = () => {
    const getAllFootball = async () => {
        try {
            const response = await axios.post(`${ADMIN_BASE_URL}/GetByCompetitionTypeId`,
                {
                    competitionTypeId: 2,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data.competitions;
            }
        } catch (error) {
            console.error("Error adding prediction:", error);
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

    const getAllFootballUser = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/GetByUserIdAndCompetitionTypeId`,
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
                return response.data.competitionUsers;
            }
        } catch (error) {
            console.log("error geting all games:", error);
        }
    };

    const getAllBigGames = async () => {
        try {
            const response = await axios.post(`${ADMIN_BASE_URL}/GetAllBigGame`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data.competitions;
            }
        } catch (error) {
            console.log("error geting all big games:", error);
        }
    };
    const getAllUsersCompetitionById = async (id) => {
        try {
            const response = await axios.post(`${BASE_URL}/GetByCompetitionId`,
                {
                    competitionId: id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data.competitionUsers;
            }
        } catch (error) {
            console.log("error geting all big games:", error);
        }
    };

    const getSingleGame = async () => {
        try {
            const response = await axios.post(`${ADMIN_BASE_URL}/GetByCompetitionTypeId`,
                {
                    competitionTypeId: 4,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data.competitions;
            }
        } catch (error) {
            console.error("Error getting game:", error);
            return []
        }
    };


    return {
        getAllFootball,
        getAllFootballUser,
        addPrediction,
        editPrediction,
        getAllBigGames,
        getAllUsersCompetitionById,
        getSingleGame,
    };
};

export default useFootballApi;
