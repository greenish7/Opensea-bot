import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { RemoveCircleOutlined, Visibility } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

export function MyCollectionPage() {
  const navigate = useNavigate();
  //   const [collections] = useContext(GlobalContext);
  const collections = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      author: "@bkristastucchio",
      slug: "proof-moonbirds",
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      author: "@rollelflex_graphy726",
      slug: "proof-moonbirds",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      author: "@helloimnik",
      slug: "proof-moonbirds",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      author: "@nolanissac",
      slug: "proof-moonbirds",
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      author: "@hjrc33",
      slug: "proof-moonbirds",
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      author: "@arwinneil",
      slug: "proof-moonbirds",
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
      author: "@tjdragotta",
      slug: "proof-moonbirds",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
      author: "@katie_wasserman",
      slug: "proof-moonbirds",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
      author: "@silverdalex",
      slug: "proof-moonbirds",
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
      author: "@shelleypauls",
      slug: "proof-moonbirds",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
      author: "@peterlaster",
      slug: "proof-moonbirds",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
      author: "@southside_customs",
      slug: "proof-moonbirds",
    },
  ];

  const handleViewCollection = (slug: string) => {
    navigate(`/collection/${slug}`);
  };

  return (
    <Grid container spacing={2}>
      {collections.map((item, i) => {
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
                    <RemoveCircleOutlined />
                  </IconButton>
                  <IconButton
                    aria-label="View"
                    onClick={() => handleViewCollection(item.slug)}
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
  );
}
