import { ExpandMoreOutlined, Visibility } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  Box,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  Collapse,
  styled,
  IconButtonProps,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import { ZeroContext } from "../../context";
import { ICollection } from "../../types";

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

export const CollectionCard = ({ collection }: { collection: ICollection }) => {
  const navigate = useNavigate();
  const { setSelectedCollection } = useContext(ZeroContext);

  const handleViewCollection = (slug: string) => {
    setSelectedCollection(collection);
    navigate(`/collection/${slug}`);
  };

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        sx={{
          maxHeight: "25rem",
          objectFit: "cover",
        }}
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
  );
};
