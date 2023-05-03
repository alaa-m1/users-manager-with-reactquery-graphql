import { Box } from "@mui/material";
import { GridLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <Box
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <GridLoader color="rgba(54, 126, 214, 1)" size={20} />
    </Box>
  );
};

export { LoadingSpinner };
