import axios from "axios";

const BASE_URL = "http://217.154.71.28/api/Doozs"; // آدرس API

const useDoozApi = () => {
  const addDooz = async (gameData) => {
    //اضافه کردن بازی Dooze
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
      console.error("Error adding Dooz:", error);
    } finally {
      console.log("Request completed");
    }
  };

  const editDooz = async (gameId, gameData) => {
    //تابع ویرایش بازی دوز
    try {
      const response = await axios.put(
        `${BASE_URL}/Edit`,
         {gameId,gameData}, // ترکیب gameId و gameData به‌عنوان یک JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        return response;
      }
    } catch (error) {
      console.error("Error editing Dooz:", error);
    } finally {
      console.log("Request completed");
    }
  };

  const deleteUser = async (gameId) => {
    //حذف کاربر
    try {
      const response = await axios.delete(
        `${BASE_URL}/Delete`,gameId, // آدرس API
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        return response;
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      console.log("Request completed");
    }
  };

  const getAllDoozs = async () => {
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
      console.log("error geting all doozes:",error);
    } finally {
      console.log("Request completed");
    }
  };

  const getDoozsById = async (Id) => {
    //دریافت لیست بازی دوز براساس آیدی
    try {
      const response = await axios.post(
        `${BASE_URL}/GetById`,
        Id, //فرستادن آیدی در body
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
      console.error("Error getting dooz by id:", error);
    } finally {
      console.log("Request completed");
    }
  };

  const getFiveByDateAndPoint = async (gameData) => {  //دریافت لیست بازی دوز براساس DoozId
    try {
      const response = await axios.post(
        `${BASE_URL}/GetFiveByDateAndPoint`,
        gameData,
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
      console.error("Error getting five by date and point:", error);
    } finally {
      console.log("Request completed");
    }
  };

  const getByUserId = async (Id) => {    //دریافت لیست بازی دوز براساسUserId
    try {
      const response = await axios.post(
        `${BASE_URL}/GetByUserId`,
        Id, //فرستادن آیدی در body
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
      console.error("Error getting by user id:", error);
    } finally {
      console.log("Request completed");
    }
  };

  return {
    getAllDoozs,
    addDooz,
    editDooz,
    deleteUser,
    getDoozsById,
    getFiveByDateAndPoint,
    getByUserId,
  };
};

export default useDoozApi;

