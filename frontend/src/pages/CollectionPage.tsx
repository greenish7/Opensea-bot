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
} from "@mui/material";
import { Visibility, Stars } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchAppBar } from "../components";

export function CollectionPage() {
  //   const [collections] = useContext(GlobalContext);
  const assets = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      author: "@bkristastucchio",
      slug: "",
      traits: [
        {
          name: "Color",
          value: "Red",
        },
        {
          name: "Size",
          value: "Large",
        },
      ],
    },

    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
      author: "@southside_customs",
      slug: "",
      traits: [
        {
          name: "Color",
          value: "Red",
        },
        {
          name: "Size",
          value: "Large",
        },
      ],
    },
  ];

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

  const [open, setOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const handleClose = () => {
    setOpen(false);
  };

  const handleViewAsset = (asset: any) => {
    setSelectedAsset(asset);
    setOpen(true);
  };

  return (
    <>
      <SearchAppBar category="asset" />
      <Box mt={1} ml={1}>
        <Grid container spacing={2}>
          {assets.map((item, i) => {
            return (
              <Grid item xs={12} sm={4} md={3} key={i}>
                <Card>
                  <CardMedia
                    component="img"
                    // height="194"
                    image={item.img}
                    alt={item.title}
                  />
                  <CardContent>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Box>
                          <Typography variant="h5" component="h2">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" component="p">
                            {item.author}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item>
                        <Box>
                          <Box component="span" mr={1}>
                            Price
                          </Box>
                          <Typography variant="h5" component="h2">
                            $1.99
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
                      <IconButton aria-label="remove">
                        {/* <RemoveCircleOutlined /> */}
                      </IconButton>
                      <IconButton
                        aria-label="View"
                        onClick={() => handleViewAsset(item)}
                      >
                        <Visibility />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
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
                    {selectedAsset.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Traits
                  </Typography>
                  <List>
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
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" component="p">
                    Offers and Bids
                  </Typography>
                  <List>
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
                  </List>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        )}
      </Box>
    </>
  );
}
