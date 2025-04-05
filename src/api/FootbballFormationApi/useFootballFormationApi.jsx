import axios from "axios";

const BASE_URL = "http://217.154.71.28/api/UserPlayers"; // آدرس API
const ADMIN_BASE_URL = "http://217.154.71.28/api/AdminPlayers"; // آدرس API

const useFootballFormationApi = () => {
    const getAllPlayersByPosition = async (position) => {
        try {
            const response = await axios.post(`${ADMIN_BASE_URL}/GetByPosition`,
                {
                    position: position,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data.adminPlayers;
            }
        } catch (error) {
            console.error("Error getting players by position:", error);
        }
    };
    const getAdminPlayerById = async (id) => {
        try {
            const response = await axios.post(`${ADMIN_BASE_URL}/GetById`,
                {
                    adminPlayerId: id
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data.adminPlayers[0];
            }
        } catch (error) {
            console.error("Error adding prediction:", error);
        }
    };

    const getUserPlayersByFormation = async (formation) => {
        try {
            const response = await axios.post(`${BASE_URL}/GetByFormation`,
                {
                    formation: formation,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data.userPlayers;
            }
        } catch (error) {
            console.error("Error getting players by formation:", error);
        }
    };
    const addPlayer = async (body) => {
        try {
            const response = await axios.post(`${BASE_URL}/Add`,
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.error("Error adding player:", error);
        }
    };
    const deletePlayer = async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/Delete`,
                {
                    data: {
                        userPlayerId: id
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.error("Error adding player:", error);
        }
    };
    return {
        getAllPlayersByPosition,
        getUserPlayersByFormation,
        addPlayer,
        deletePlayer,
        getAdminPlayerById,
    };
};

export default useFootballFormationApi;
