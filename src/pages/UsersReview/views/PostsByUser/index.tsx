import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { getPosts, getUsers } from "actions";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { Post, User } from "shared/types";
import { queryKeys } from "utils/reactQuery/queryKeys";

const PostsByUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: users } = useQuery<Array<User>>(
    queryKeys.getUsersWithPagination,
    getUsers
  );

  const selectFunc = useCallback(
    (posts: Array<Post>) =>
      posts.filter((item) => item.userId === selectedUser?.id),
    [selectedUser?.id]
  );
  const { data: posts } = useQuery<Array<Post>>(queryKeys.getPosts, getPosts, {
    select: selectedUser !== null ? selectFunc : undefined,
    ///To suppress refeching
    // staleTime:50000,// 5 minutes
    // cacheTime: 70000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Box>
        <Autocomplete
          id="country-select-demo"
          sx={{ width: 300 }}
          options={users || []}
          autoHighlight
          onChange={(event: any, newValue: User | null) => {
            setSelectedUser(newValue);
          }}
          getOptionLabel={(option) => option.name}
          renderOption={(
            props: React.HTMLAttributes<HTMLLIElement>,
            option
          ) => <li {...props}>{option.name}</li>}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a user"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          boxShadow: "3px 3px 6px #ccc",
          borderRadius: "6px",
          padding: "10px",
          li: {
            listStyle: "none",
          },
          margin: "10px",
        }}
      >
        <ul>
          {(posts || []).map((post) => (
            <li key={post.id} style={{marginBottom:'10px'}}>
              <Typography
                component="div"
                color="info"
                sx={{ fontWeight: "bold" }}
              >
                {post.title}:&nbsp;
              </Typography>
              <Typography component="div" color="info">
                {post.body}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
};
export default PostsByUser;
