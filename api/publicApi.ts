import axios from "axios";

const getMarineStatYearbook = async () => {
  try {
    const response = await axios.get(
      "https://www.data.go.kr/data/3044767/openapi.do"
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const publicApi = {
  getMarineStatYearbook,
};

export default publicApi;
