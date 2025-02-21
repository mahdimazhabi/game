import axios from "axios";

const useExampleApi = () => {
  const getExample = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
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
      console.log(error);
    } finally {
      console.log("Request completed");
    }
  };
  return {
    getExample,
  };
};

export default useExampleApi;
