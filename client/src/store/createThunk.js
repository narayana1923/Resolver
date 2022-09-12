import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "./api";

const getAsyncThunk = (type, dataURL, data) => {
  return createAsyncThunk(type, async () => {
    const response = await fetchData(dataURL, data);
    if (response === undefined) {
      throw new Error("Error while Fetching " + dataURL + " data");
    }
    // const finalData = await JSON.parse(response);
    return response;
  });
};

export default getAsyncThunk;
