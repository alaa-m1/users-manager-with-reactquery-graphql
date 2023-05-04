import { Box, Button, Typography, useTheme } from "@mui/material";
import { deletePost } from "actions";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "pages/hooks";
import React from "react";
import { LoadingSpinner } from "shared";

const UserProfile = () => {
  const { id } = useParams();
  const theme = useTheme();
  const { data: user, isError } = useUser(id?.toString() || "0");
  const deleteMutation = useMutation((id: string) => deletePost(id));

  const handleDelete = () => {
    deleteMutation.mutate(user!.id.toString());
  };
  useEffect(() => {
    if (deleteMutation.isSuccess) {
      toast.success(
        "Delete post successfully.... However the post will still exist on 'jsonplaceholder'"
      );
      deleteMutation.reset();
    }
  }, [deleteMutation]);
  return (
    <Box
      sx={{
        wdith: "80%",
        height: "80%",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxShadow: "3px 3px 5px #ccc",
        padding: "10px",
        ":hover": { boxShadow: "6px 6px 10px #ccc" },
      }}
    >
      <React.Suspense fallback={<LoadingSpinner />}>
        {!isError && (
          <>
            <Typography variant="h3" color="primary">
              {user?.name}
            </Typography>
            <Typography variant="h6" color="primary">
              <Typography
                component="span"
                sx={{ color: theme.palette.secondary.main, fontSize: "20px" }}
              >
                Address:&nbsp;
              </Typography>
              {`${user?.address.city}, ${user?.address.street}, ${user?.address.zipcode}`}
            </Typography>
            <Typography variant="h6" color="primary">
              <Typography
                component="span"
                sx={{ color: theme.palette.secondary.main, fontSize: "20px" }}
              >
                Phone:&nbsp;
              </Typography>
              {user?.phone}
            </Typography>
            <Typography variant="h6" color="primary">
              <Typography
                component="span"
                sx={{ color: theme.palette.secondary.main, fontSize: "20px" }}
              >
                Website:&nbsp;
              </Typography>
              {user?.website}
            </Typography>
            <Typography variant="h6" color="primary">
              <Typography
                component="span"
                sx={{ color: theme.palette.secondary.main, fontSize: "20px" }}
              >
                Email:&nbsp;
              </Typography>
              {user?.email}
            </Typography>
            <Typography variant="h6" color="primary">
              <Typography
                component="span"
                sx={{ color: theme.palette.secondary.main, fontSize: "20px" }}
              >
                Company:&nbsp;
              </Typography>
              {`${user?.company.name}, ${user?.company.bs}`}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Button onClick={handleDelete}>Delete</Button>
            </Box>
          </>
        )}
      </React.Suspense>
    </Box>
  );
};

export default UserProfile;
