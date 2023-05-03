import axios from "axios"

export const deletePost=async(postId: string)=>{
    const response =await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return response.data;
}