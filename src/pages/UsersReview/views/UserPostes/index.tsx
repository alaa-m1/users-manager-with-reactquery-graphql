import { Box, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useRef, } from "react";
import { User } from "shared/types";
import { useUserPosts } from "pages/hooks";
type UserPostsProps = {
  user: User;
};

const UserPosts = forwardRef(({ user }: UserPostsProps, ref) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const { data: posts } = useUserPosts(user.id.toString());
  useImperativeHandle(ref, () => {
    return {
      scrollUp: () => {
        if (boxRef.current) boxRef.current.scrollTop = 0;
        else return false;
      },
    };
  });
  return (
    <Box position="fixed">
      <Box
        ref={boxRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          boxShadow: "3px 3px 6px #ccc",
          borderRadius: "6px",
          height: "350px",
          padding: "10px",
          li: {
            listStyle: "none",
          },
          overflowY: "scroll",
          margin: "10px",
        }}
      >
        <Typography variant="h6">{`${user.name} posts:`}</Typography>
        <ul>
          {(posts || []).map((post) => (
            <li key={post.id} style={{marginBottom:'5px'}}>
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
});
export default UserPosts;
