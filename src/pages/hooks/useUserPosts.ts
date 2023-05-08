import { getUserPosts } from "actions";
import { useQuery } from "react-query";
import { Post } from "shared/types";
import { queryKeys } from "utils/reactQuery/queryKeys";

export const useUserPosts=(id: string)=>{
    return useQuery<Array<Post>, Error>(
        [queryKeys.getPostsByUser, id],
        () => getUserPosts(id),{suspense: true}
      );
}