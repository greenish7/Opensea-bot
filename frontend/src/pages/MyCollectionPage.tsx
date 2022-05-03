import { Typography, Grid, Stack } from "@mui/material";
import { useContext, useEffect } from "react";
import { ZeroContext } from "../context";
import { CollectionCard } from "../components";

export function MyCollectionPage() {
  const { myCollections, fetchMyCollections } = useContext(ZeroContext);

  useEffect(() => {
    fetchMyCollections();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={2}>
      {myCollections.length > 0 ? (
        myCollections.map((collection, i) => {
          return (
            <Grid item xs={12} sm={4} md={3} key={i}>
              <CollectionCard collection={collection} />
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12}>
          <Stack textAlign="center">
            <Typography variant="h5" component="h2" mt={4}>
              You have no collections.
            </Typography>

            <Typography variant="body2" component="p">
              Favorite some collections and they will show up here.
            </Typography>
          </Stack>
        </Grid>
      )}
    </Grid>
  );
}
