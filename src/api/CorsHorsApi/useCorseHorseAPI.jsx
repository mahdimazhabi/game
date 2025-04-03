import axios from "axios";

const BASE_URL = "http://217.154.71.28/api/CorsHorseUsers"; // آدرس API
const ADMIN_BASE_URL = "http://217.154.71.28/api/CorsTitles"; // آدرس API

const useCorsHorseApi = () => {
	const getAllData = async () => {
		try {
			const response = await axios.post(`${ADMIN_BASE_URL}/GetAllData`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
					},
				});
			if (response) {
				return response.data.corsTitlesAllData;
			}
		} catch (error) {
			console.error("Error getting cors data:", error);
		}
	};

	const getUserHorses = async () => {
		try {
			const response = await axios.post(`${BASE_URL}/GetByUserId`,
				{
					userId: parseInt(localStorage.getItem("userId")),
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				});
			if (response) {
				return response.data.corsHorseUsers;
			}
		} catch (error) {
			console.error("Error getting user cors data:", error);
		}
	};

	const addUserHorse = async (data) => {
		try {
			const response = await axios.post(`${BASE_URL}/Add`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				});
			if (response) {
				return response.data;
			}
		} catch (error) {
			console.error("Error adding cors horse:", error);
			return error.response.data.value.message;
		}
	};

	const editUserHorse = async (data) => {
		try {
			const response = await axios.post(`${BASE_URL}/Edit`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				});
			if (response) {
				return response.data;
			}
		} catch (error) {
			console.error("Error getting cors data:", error);
		}
	};

	const deleteUserHorse= async (id) => {
		try {
			const response = await axios.delete(`${BASE_URL}/Delete`,
				{
					data: {
						corsHorseUserId: id
					},
					headers: {
						"Content-Type": "application/json",
					},
				});
			if (response) {
				return response.data;
			}
		} catch (error) {
			console.error("Error deleting user horse:", error);
		}
	};

	return {
		getAllData,
		getUserHorses,
		addUserHorse,
		editUserHorse,
		deleteUserHorse,
	};
};

export default useCorsHorseApi;
