import axios from "axios";
import { xml2json } from "xml-js";

const serviceKey =
  "38g8A68UQszljdCkecWs4YKHBtb5rI4CNORXbPT/HkZ9iisF0lK0BiY9XxC3xc1cGwtMvD4n218Q7YuUffWg0w==";

const today = new Date();

const base_date = today.toISOString().split("T")[0].replace(/-/g, "");

const base_time =
  today.getHours().toString().padStart(2, "0") +
  today.getMinutes().toString().padStart(2, "0");

const getUltraSrtNcst = async () => {
  try {
    const response = await axios.get(
      "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst",
      {
        params: {
          serviceKey: serviceKey,
          numOfRows: 10,
          pageNo: 1,
          base_date: "20250113",
          base_time: base_time,
          nx: 55,
          ny: 127,
          format: "xml",
        },
      }
    );

    const result = response.data;

    // xml-js 라이브러리 사용해 json으로 변환
    const json = xml2json(result, { compact: true, spaces: 4 });
    return JSON.parse(json);
  } catch (error) {
    console.error("API 호출 중 오류 발생");
    throw error;
  }
};

const publicApi = {
  getUltraSrtNcst,
};

export default publicApi;
