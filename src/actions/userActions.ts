import { axiosInstance } from "utils/axiosInstance";
export const getUsersWithPagination = async (pageNumber: string, itemsPerPage: string) => {
  // using fetch
  // const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${itemsPerPage}&_page=${pageNumber}`, {
  //   headers: {
  //     Accept: "application/json",
  //   },
  // });
  // return response.json();
  // using axios
  const response = await axiosInstance.get(
    `/users?_limit=${itemsPerPage}&_page=${pageNumber}`
  );
  return response.data;
};

export const getUsers = async () => {

  const response = await axiosInstance.get(
    `/users`
  );
  return response.data;
};

export const getUser = async ({ queryKey }: { queryKey: any }) => {
  const [_, id] = queryKey;

  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

export const getUserPosts = async (userId: string) => {
  const response = await axiosInstance.get(`/users/${userId}/posts`);
  return response.data;
};
