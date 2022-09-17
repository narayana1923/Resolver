import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "./api";

export const getAsyncThunk = (type, dataURL, data) => {
  return createAsyncThunk(type, async () => {
    const response = await fetchData(dataURL, data);
    if (response === undefined || response === "Not Ok") {
      throw new Error("Error while Fetching " + dataURL + " data");
    }
    // const finalData = await JSON.parse(response);
    return response;
  });
};

export default getAsyncThunk;
