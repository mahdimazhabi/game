import axios from "axios";

const BASE_URL = "http://217.154.71.28/api/DoozRequests"; // آدرس API

const useDoozeRequestApi = () => {
    const addDoozRequest = async (gameData) => {
        //اضافه کردن درخواست کاربران برای دوز
        try {
            const response = await axios.post(`${BASE_URL}/Add`, gameData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.log("error adding dooz request:", error);
        } finally {
            console.log("Request completed");
        }
    };

    const editDoozRequest = async (gameId, gameData) => {
        //ویرایش درخواست کاربران برای بازی دوز
        try {
            const response = await axios.put(
                `${BASE_URL}/Edit`,
                {gameData, gameId},
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
            console.error("Error editing Dooz request:", error);
        } finally {
            console.log("Request completed");
        }
    };

    const closeDoozRequest = async (gameId, gameData) => {
        //بستن سشن
        try {
            const response = await axios.put(
                `${BASE_URL}/CloseSession`,
                {gameData, gameId},
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
            console.error("Error closing Dooz request:", error);
        } finally {
            console.log("Request completed");
        }
    };

    const deleteDoozRequest = async (gameId) => {
        //حذف کاربر
        try {
            const response = await axios.delete(
                `${BASE_URL}/Delete`,
                gameId, // آدرس API
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
            console.error("Error deleting user request :", error);
        } finally {
            console.log("Request completed");
        }
    };

    const getAllDoozRequests = async () => {
        //دریافت لیست بازی دوز
        try {
            const response = await axios.post(`${BASE_URL}/GetAll`, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response) {
                return response.data;
            }
        } catch (error) {
            console.log("error getting all dooz requests :", error);
        } finally {
            console.log("Request completed");
        }
    };
    const getAllRequestOnline = async (gameData) => {
        //دریافت لیست درخواست کاربران برای دوز بر اساسDoozRequestId
        try {
            const response = await axios.post(
                `${BASE_URL}/GetAllOnline()`,
                gameData, //فرستادن دیتا در body
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
            console.error("Error getting all requests:", error);
        } finally {
            console.log("Request completed");
        }
    };

    return {
        addDoozRequest,
        editDoozRequest,
        deleteDoozRequest,
        getAllDoozRequests,
        getAllRequestOnline,
        closeDoozRequest
    };
};

export default useDoozeRequestApi;
