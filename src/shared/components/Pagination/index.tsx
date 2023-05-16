import { Box, Button, Typography } from "@mui/material";

const Pagination = ({
  currentPage,
  pageNumber,
  setPage,
  itemsPerPage,
  setItemsPerPage,
}: PaginationProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        button: { textTransform: "unset" },
        placeItems: "center",
        border: "1px solid #ccc",
        padding: "5px",
        borderRadius: "6px",
      }}
    >
      <Button disabled={currentPage <= 1} onClick={() => setPage((p) => p - 1)}>
        Previous page
      </Button>
      <Typography>Page:{currentPage}</Typography>
      <label htmlFor="itemsperpage">
        Items per page:&nbsp;
        <input
          value={itemsPerPage}
          name="itemsperpage"
          type="number"
          min={1}
          onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
          }}
          style={{ width: "50px" }}
        />
      </label>

      <Button
        disabled={currentPage >= pageNumber}
        onClick={() => {
            setPage((p) => p + 1);
        }}
      >
        Next page
      </Button>
    </Box>
  );
};

export { Pagination };

type PaginationProps = {
  currentPage: number;
  pageNumber: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
};