import axios from "axios"
import { axiosInstance } from "utils/axiosInstance";

export const getPosts = async () => {
    const response = await axiosInstance.get(`/posts`);
    return response.data;
  };

export const deletePost=async(postId: string)=>{
    const response =await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return response.data;
}