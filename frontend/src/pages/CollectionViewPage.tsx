import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Grid,
  Modal,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { SearchAppBar, ThreeDots } from "../components";
import { GlobalContext, ZeroContext } from "../context";
import { IAsset } from "../types";
import { utils } from "ethers";

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  color: "#2196f3",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export function CollectionPage() {
  const {
    assets,
    fetchCollectionAssets,
    selectedCollection,
    selectedAssets,
    setSelectedAssets,
  } = useContext(ZeroContext);
  const { isLoading } = useContext(GlobalContext);

  const [open, setOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (asset: IAsset) => () => {
    let temp = new Map(selectedAssets);
    if (temp.has(asset.id)) {
      temp.delete(asset.id);
    } else {
      temp.set(asset.id, assets.find((a: IAsset) => a.id === asset.id)!);
    }

    setSelectedAssets(temp);
  };

  useEffect(() => {
    if (selectedCollection) {
      fetchCollectionAssets({
        count: selectedCollection.stats["count"],
        collection: selectedCollection.slug,
      });
    }
    // eslint-disable-next-line
  }, []);

  const handleViewAsset = (asset: IAsset) => {
    setSelectedAsset(asset);
    setOpen(true);
  };

  return (
    <>
      <SearchAppBar category="asset" />
      <Box mt={1} ml={1}>
        <Grid container spacing={2}>
          {isLoading ? (
            <Grid item xs={12} textAlign="center">
              <ThreeDots />
            </Grid>
          ) : assets.length > 0 ? (
            assets.map((asset, i) => {
              return (
                <Grid item xs={12} sm={4} md={3} key={i}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="194"
                      image={
                        asset.image_url ||
                        asset.image_thumbnail_url ||
                        asset.image_original_url ||
                        asset.image_preview_url ||
                        asset.animation_url ||
                        asset.asset_contract.image_url
                      }
                      alt={asset.name || asset.asset_contract.name}
                    />
                    <CardContent>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Box>
                            <Typography variant="h5" component="h2">
                              {asset.name || asset.asset_contract.name}
                            </Typography>
                            <Typography variant="body2" component="p">
                              {asset.owner.user.username || asset.owner.address}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Box>
                            <Box component="span" mr={1}>
                              Price
                            </Box>
                            <Typography variant="body2" component="p">
                              {asset.last_sale
                                ? utils.formatUnits(
                                    asset.last_sale.total_price,
                                    asset.last_sale.payment_token.decimals || 18
                                  )
                                : ""}{" "}
                              {asset.last_sale?.payment_token.symbol}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        sx={{
                          width: "100%",
                        }}
                      >
                        <IconButton aria-label="" onClick={handleToggle(asset)}>
                          <Checkbox
                            edge="start"
                            checked={selectedAssets.has(asset.id)}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{
                              "aria-labelledby":
                                asset.name || asset.asset_contract.name,
                            }}
                          />
                        </IconButton>
                        <IconButton
                          aria-label="View"
                          onClick={() => handleViewAsset(asset)}
                        >
                          <Visibility />
                        </IconButton>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12}>
              <Box textAlign="center">
                <Typography variant="h5" component="h2">
                  No assets found in {selectedCollection?.name}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
        {selectedAsset && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, minWidth: 600 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h5" component="h2">
                    {selectedAsset.name}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Traits
                  </Typography>
                  {/* <List>
                    {selectedAsset.traits.map((trait: any, i: number) => {
                      return (
                        <ListItem key={i}>
                          <ListItemAvatar>
                            <Avatar>
                              <Stars />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={trait.value}
                            secondary={trait.value}
                          />
                        </ListItem>
                      );
                    })}
                  </List> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" component="p">
                    Offers and Bids
                  </Typography>
                  {/* <List>
                    {(selectedAsset.offers || []).map(
                      (trait: any, i: number) => {
                        return (
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <Stars />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={trait.value}
                              secondary={trait.value}
                            />
                          </ListItem>
                        );
                      }
                    )}
                  </List> */}
                </Grid>
              </Grid>
            </Box>
          </Modal>
        )}
      </Box>
    </>
  );
}
