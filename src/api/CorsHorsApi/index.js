import axios from "axios";

const API_URL = "http://217.154.71.28/api/CorsHorses"; // مقدار پیش‌فرض

const useCorsHorseApi = () => {
	const getAllCorsHorses = async () => {
		try {
			const response = await axios.post(`${API_URL}/GetAll`, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data.corseHorses;
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	return { getAllCorsHorses };
};

export default useCorsHorseApi;
