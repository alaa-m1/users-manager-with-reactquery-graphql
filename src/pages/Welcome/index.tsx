import { Box } from "@mui/material";

const Welcome = () => {
  return <Box >
    <Box sx={{position:"absolute", left:"50vw", top:"50vh", transform:"translate(-50%, -50%)"}}>
      <img src={window.location.origin+'/images/Phoenix-Productions.png'} alt="Phoenix Productions" />
    </Box>
  </Box>;
};
export default Welcome;
