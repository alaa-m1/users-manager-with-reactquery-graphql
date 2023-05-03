import { getUser } from "actions"
import { useQuery } from "react-query"
import { User } from "shared/types"
import { queryKeys } from "utils/reactQuery/queryKeys"

export const useUser=(id: string)=>{

    return useQuery<User, Error>([queryKeys.getUser, id], getUser)
}
