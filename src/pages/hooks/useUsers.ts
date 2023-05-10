import { getUsersWithPagination } from "actions";
import { queryKeys } from "utils/reactQuery/queryKeys";
import { useQuery } from "react-query";
import { User } from "shared/types";

export const useUsers = (page: string, itemsPerPageValue: string) => {

  const response = useQuery<Array<User>>([queryKeys.getUsersWithPagination, page,itemsPerPageValue], () =>
    getUsersWithPagination(page, itemsPerPageValue)
  );
  return response;
};
