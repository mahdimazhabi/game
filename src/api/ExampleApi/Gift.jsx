
import axios from "axios";
const BASE_URL = "http://217.154.71.28/api/Gifts"; // آدرس API
const useGiftApi = () => {

  const addGifts = async (gameData) => {
    //اضافه کردن جایزه
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
      console.error("Error adding gifts:", error);
      return null;
    }
  };

  const editGifts = async (gameId, gameData) => {
    //ویرایش جایزه
    try {
      const response = await axios.put(
        `${BASE_URL}/Edit`,
       {gameId, gameData}, //ارسال دیتا در body
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
      console.error("Error editing gift:", error);
    } finally {
      console.log("Request completed");
    }
  };
  const deleteGift = async (gameId) => {
      //حذف کاربر
      try {
        const response = await axios.delete(
          `${BASE_URL}/Delete`,gameId, //فرستادن آیدی در body
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
        console.error("Error deleting gift:", error);
      } finally {
        console.log("Request completed");
      }
    };
  const getAllActiveGifts = async () => {   //دریافت لیست جایزه فعال
      try {
        const response = await axios.post(`${BASE_URL}/GetAllActive`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response) {
          return response.data;
        }
      } catch (error) {
        console.log("error geting all active gifts:",error);
      } finally {
        console.log("Request completed");
      }
    };
    const getAllGifts = async () => { 
        //دریافت لیست جایزه
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
          console.log("error getting all gifts:",error);
        } finally {
          console.log("Request completed");
        }
      };
    const getGiftById = async (Id) => {
       //دریافت لیست جایزه براساس آیدی
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
          console.error("Error getting gift by id:", error);
        } finally {
          console.log("Request completed");
        }
      };
      const getGiftByName = async (Name) => {
        //دریافت لیست جایزه براساس Name
         try {
           const response = await axios.post(
             `${BASE_URL}/GetByName`,
             Name, //فرستادن Name در body
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
           console.error("Error getting gift by Name:", error);
         } finally {
           console.log("Request completed");
         }
       };
  return {
    addGifts,
    editGifts,
    deleteGift,
    getAllActiveGifts,
    getAllGifts,
    getGiftById,
    getGiftByName
  };
};

export default useGiftApi;
