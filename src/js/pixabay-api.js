import axios from "axios";

const API_KEY = "49733939-659891c25e41a9f00718666a7";
const BASE_URL = "https://pixabay.com/api/";

export const getImagesByQuery = async (query, page = 1, perPage = 15) => {
  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page,
    per_page: perPage,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data; 
};
