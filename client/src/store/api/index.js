import Axios from "axios";

export const baseUrl = "http://localhost:3001/";

export const fetchData = async (dataURL, data) => {
  return Axios.post(baseUrl + dataURL, {
    data: data,
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      return undefined;
    });
};
