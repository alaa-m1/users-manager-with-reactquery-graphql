import { getUsers } from "actions";
import { queryKeys } from "utils/reactQuery/queryKeys";
import { useQuery } from "react-query";
import { User } from "shared/types";

export const useUsers = (page: string, itemsPerPageValue: string) => {

  const response = useQuery<Array<User>>([queryKeys.getUsers, page,itemsPerPageValue], () =>
    getUsers(page, itemsPerPageValue)
  );
  return response;
};
