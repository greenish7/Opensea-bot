import { ExpandMoreOutlined, Visibility } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SearchAppBar, ThreeDots } from "../components";
import { config } from "../config";
import { ZeroContext, GlobalContext } from "../context";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function SearchPage() {
  const { collections } = useContext(ZeroContext);
  const { isLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleViewCollection = (slug: string) => {
    navigate(`/collection/${slug}`);
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <SearchAppBar category="collection" />
      <Grid container mt={1} ml={1}>
        {isLoading ? (
          <ThreeDots />
        ) : collections.length > 0 ? (
          collections.map((collection) => (
            <Grid item xs={12} sm={3} md={3} key={collection.slug}>
              <Card>
                <CardMedia
                  component="img"
                  // height="194"
                  image={collection.image_url}
                  alt={collection.name}
                />
                <CardContent>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Box>
                        <Typography variant="h5" component="span">
                          {collection.name}
                        </Typography>
                        {/* <Typography variant="body2" component="p">
                          {collection.}
                        </Typography> */}
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Box component="span" mr={1}>
                          Floor Price
                        </Box>
                        <Box component="span">
                          {collection.stats?.floor_price || 0}{" "}
                          {collection.payment_tokens[0].symbol}
                        </Box>
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
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreOutlined />
                    </ExpandMore>
                    <IconButton
                      aria-label="View"
                      onClick={() => handleViewCollection(collection.slug)}
                    >
                      <Visibility />
                    </IconButton>
                  </Box>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Description:</Typography>
                    <Typography paragraph>
                      {collection.description}
                      <br />
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${config.REACT_APP_OPENSEA_BASE_URL}/collection/${collection.slug}`}
                        style={{ textDecoration: "underline" }}
                      >
                        View on Opensea
                      </a>
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))
        ) : (
          <Box mt={4}>No Assets Found</Box>
        )}
      </Grid>
    </>
  );
}
