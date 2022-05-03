import { useContext, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Box,
  Stack,
  Button,
} from "@mui/material";
import {
  Category,
  ArrowBackIos,
  CurrencyLiraOutlined,
  AcUnitOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ICollection } from "../../types";
import { ZeroContext } from "../../context";

export function FilterDrawer({
  collection,
}: {
  collection: ICollection | null;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const { selectedAssets } = useContext(ZeroContext);
  // const { isLoading } = useContext(GlobalContext);
  const navigate = useNavigate();

  const count = collection?.stats["count"] || 0;

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };

  const handleOnAssetSubmit = () => {
    try {
    } catch (error) {}
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      variant="permanent"
    >
      <Stack>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Stack
            direction="row"
            mt={1.7}
            mb={1.7}
            ml={0.85}
            mr={0.85}
            spacing={0.8}
            justifyContent="space-between"
          >
            <Box alignSelf="center"> count: {count} </Box>
            <Box alignSelf="center"> selected: {selectedAssets.size} </Box>
            {
              <Button
                variant="text"
                disabled={selectedAssets.size < 1}
                onClick={handleOnAssetSubmit}
              >
                Submit
              </Button>
            }
          </Stack>
          <Divider />
          <List>
            <ListItem button key="Price">
              <ListItemIcon>
                <CurrencyLiraOutlined />
              </ListItemIcon>
              <ListItemText primary="Price" />
            </ListItem>
            <Divider />
            <ListItem button key="Status">
              <ListItemIcon>
                <AcUnitOutlined />
              </ListItemIcon>
              <ListItemText primary="Status" />
            </ListItem>
            <Divider />
            <ListItem button key="Traits">
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText primary="Traits" />
            </ListItem>
          </List>
        </Box>
        <Box>
          <Divider />
          <List>
            <ListItem
              button
              key="Back"
              onClick={() => {
                navigate(-1);
              }}
            >
              <ListItemIcon>
                <ArrowBackIos />
              </ListItemIcon>
              <ListItemText primary="Back" />
            </ListItem>
          </List>
        </Box>
      </Stack>
    </SwipeableDrawer>
  );
}
