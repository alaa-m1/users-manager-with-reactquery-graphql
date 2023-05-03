import { Box, Typography, useTheme } from "@mui/material";
import { getProducts, productsUrl } from "actions/productActions";
import { queryKeys } from "utils/reactQuery/queryKeys";
import { useInfiniteQuery } from "react-query";
import InfiniteScroll from "react-infinite-scroller";
import ProductsInfo from "./views/ProductsInfo";
import { LoadingSpinner } from "shared";

type ResponseType = {
  pages: Array<Page>;
};
type Page = {
  results: Array<Product>;
  count: number;
  next: string | null;
  previous: string | null;
};
type Product = {
  name: string;
  birth_year: string;
  height: string;
};
const Products = () => {
  const theme = useTheme();
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<Page>(
    queryKeys.getProducts,
    ({ pageParam = productsUrl }) => getProducts(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => lastPage.next,
      getPreviousPageParam: (lastPage, allPages) => lastPage.previous,
    }
  );
  return (
    <Box sx={{ margin: "10px 20px" }}>
      <Typography
        color={theme.palette.success.main}
        sx={{
          display: "inline-block",
          backgroundColor: "#ccc",
          width: "auto",
          borderRadius: "10px",
          padding: "2px 5px",
          margin: "5px",
        }}
      >
        This is fake data from 'swapi.dev/api/people/' API for demonstration
        purpose of the Infinite Scrolling
      </Typography>
      <InfiniteScroll
        pageStart={1}
        loadMore={fetchNextPage as any}
        hasMore={hasNextPage}
        loader={<LoadingSpinner />}
        useWindow={true}
      >
        {(data?.pages || []).map((page) => {
          return page.results.map((product, index) => {
            return (
              <ProductsInfo
                key={index}
                name={product.name}
                birth_year={product.birth_year}
                height={product.height}
              />
            );
          });
        })}
      </InfiniteScroll>
    </Box>
  );
};
export default Products;
