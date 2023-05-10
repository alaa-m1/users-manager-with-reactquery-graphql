import axios from "axios";

export const productsUrl = "https://swapi.dev/api/people/?page=1";
export const getProducts = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
    
  } catch (error: any) {
    throw Error(error.message)
  }
};
