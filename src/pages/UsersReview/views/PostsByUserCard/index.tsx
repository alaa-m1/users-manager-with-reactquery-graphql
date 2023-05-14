import { Box, Grid } from "@mui/material";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { LoadingSpinner, Pagination, UserCard } from "shared";
import { User } from "shared/types";
import { useDebounce } from "shared/hooks";
import { useUsers } from "pages/hooks";
import React from "react";
import { useQueryClient } from "react-query";
import { queryKeys } from "utils/reactQuery/queryKeys";
import { getUsersWithPagination } from "actions";
import UserPosts from "../UserPostes";
const postsNumber = 10; // This value should be taken from the backend (In the first response form the backend)

const PostsByUserCard = () => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const postRef = useRef<any>(null);
  //pagination
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const deferredItemsPerPage = useDeferredValue(itemsPerPage);
  const [currentPage, setPage] = useState<number>(1);
  const deferredCurrentPage = useDeferredValue(currentPage);
  const pageNumber = useMemo(
    () => Math.ceil(postsNumber / deferredItemsPerPage),
    [deferredItemsPerPage]
  );

  const {
    data: users,
    isLoading,
    refetch
  } = useUsers(deferredCurrentPage.toString(), deferredItemsPerPage.toString());

  const debounce = useDebounce();
  useEffect(() => {
    setPage(1);
    debounce(() => refetch(), 200);
  }, [deferredItemsPerPage, refetch]);
  //

  // Pre-fetching
  const queryClient = useQueryClient();
  useEffect(() => {
    if (deferredCurrentPage <= pageNumber) {
      const nextPage = deferredCurrentPage + 1;
      queryClient.prefetchQuery<Array<User>>(
        [queryKeys.getUsersWithPagination, nextPage],
        () => getUsersWithPagination(nextPage.toString(), deferredItemsPerPage.toString())
      );
    }
  }, [deferredItemsPerPage, deferredCurrentPage, pageNumber, queryClient]);
  

  const handleCardClick = (id: number) => {
    setSelectedUser((users || []).filter((item) => item.id === id)[0]);
    if (postRef.current) postRef.current?.scrollUp();
  };
  return (
    <Grid container sx={{ height: "85vh" }}>
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              overflowY: "auto",
              height: "78vh",
            }}
          >
            {isLoading || (currentPage!==deferredCurrentPage || itemsPerPage!==deferredItemsPerPage) ? (
              <LoadingSpinner />
            ) : 
              //  <React.Suspense fallback={<LoadingSpinner />}>
                (users || []).map((userInfo) => (
                  <UserCard
                    key={userInfo.id}
                    userInfo={userInfo}
                    onCardClick={handleCardClick}
                  ></UserCard>
                ))}
               {/* </React.Suspense> */}
            
          </Box>
          <Pagination
            pageNumber={pageNumber}
            currentPage={currentPage}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <React.Suspense fallback={<LoadingSpinner />}>
          {selectedUser && <UserPosts user={selectedUser} ref={postRef} />}
        </React.Suspense>
      </Grid>
    </Grid>
  );
};
export default PostsByUserCard;
