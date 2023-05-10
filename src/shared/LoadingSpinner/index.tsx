import { Box } from "@mui/material";
import { GridLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <Box
      sx={{
        display:'flex',
        justifyContent:'center'
      }}
    >
      <GridLoader color="rgba(54, 126, 214, 1)" size={20} />
    </Box>
  );
};

export { LoadingSpinner };
