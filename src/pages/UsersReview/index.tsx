import { Box, Grid } from "@mui/material";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQueryClient } from "react-query";
import { Pagination, UserCard } from "shared";
import { User } from "shared/types";
import UserPosts from "./views/UserPostes";
import { queryKeys } from "utils/reactQuery/queryKeys";
import { useDebounce } from "shared/hooks";
import { useUsers } from "pages/hooks";
import { getUsers } from "actions";
const postsNumber = 10; // This value should be taken from the backend (In the first response form the backend)

const UsersReview = () => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const postRef = useRef<any>(null);
  //pagination
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const itemsPerPageValue = useDeferredValue(itemsPerPage);
  const pageNumber = useMemo(
    () => Math.ceil(postsNumber / itemsPerPageValue),
    [itemsPerPageValue]
  );

  const {
    data: users,
    isLoading,
    refetch,
  } = useUsers(page.toString(), itemsPerPageValue.toString());

  const debounce = useDebounce();
  useEffect(() => {
    setPage(1);
    debounce(() => refetch(), 200);
  }, [itemsPerPageValue, refetch]);
  //

  //Pre-fetching
  const queryClient = useQueryClient();
  useEffect(() => {
    if (page <= pageNumber) {
      const nextPage = page + 1;
      queryClient.prefetchQuery<Array<User>>(
        [queryKeys.getUsers, nextPage],
        () => getUsers(nextPage.toString(), itemsPerPageValue.toString())
      );
    }
  }, [itemsPerPageValue, page, pageNumber, queryClient]);
  //

  const handleCardClick = (id: number) => {
    setSelectedUser((users || []).filter((item) => item.id === id)[0]);
    if (postRef.current) postRef.current?.scrollUp();
  };

  return (
    <Grid container sx={{height:'88vh'}}>
      <Grid item xs={12} md={8} >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent:'space-between',
            height:'100%'
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", overflowY:'auto', height:'80vh' }}
          >
            {(users || []).map((userInfo) => (
              <UserCard
                key={userInfo.id}
                userInfo={userInfo}
                onCardClick={handleCardClick}
              ></UserCard>
            ))}
          </Box>
          <Pagination
            pageNumber={pageNumber}
            currentPage={page}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        {selectedUser && <UserPosts user={selectedUser} ref={postRef} />}
      </Grid>
    </Grid>
  );
};
export default UsersReview;
