import { Box, Grid } from "@mui/material";
import { useContext } from "react";

import { SearchAppBar, ThreeDots } from "../components";
import { CollectionCard } from "../components/cards";
import { ZeroContext, GlobalContext } from "../context";

export function SearchPage() {
  const { collections } = useContext(ZeroContext);
  const { isLoading } = useContext(GlobalContext);

  console.log({
    collections,
  });

  return (
    <>
      <SearchAppBar category="collection" />
      <Grid container mt={1} ml={1}>
        {isLoading ? (
          <Grid item xs={12} textAlign="center">
            <ThreeDots />
          </Grid>
        ) : collections.length > 0 ? (
          collections.map((collection) => (
            <Grid item xs={12} sm={3} md={3} key={collection.slug}>
              <CollectionCard collection={collection} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} textAlign="center">
            <Box mt={4}>No Assets Found </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}
