import { Box, Typography, useTheme } from "@mui/material";

type ProductInfoProps = {
  name: string;
  height: string;
  birth_year: string;
};
const ProductsInfo = ({ name, height, birth_year }: ProductInfoProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        // backgroundColor: "#ccc",
        width: "100%",
        height: "50px",
        borderRadius: "6px",
        border: "1px solid #bbb",
        margin: "5px",
        padding: "2px",
        boxShadow: "2px 2px 2px 2px #ccc",
      }}
    >
      <Typography component="div" color={theme.palette.primary.main}>
        <Typography component="span" color={theme.palette.warning.main}>
          Name:&nbsp;
        </Typography>
        {name}
      </Typography>
      <Typography component="div" color={theme.palette.primary.main}>
        <Typography component="span" color={theme.palette.warning.main}>
          Height:&nbsp;
        </Typography>
        {height}
      </Typography>
    </Box>
  );
};

export default ProductsInfo;
