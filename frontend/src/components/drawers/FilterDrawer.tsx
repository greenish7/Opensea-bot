import { useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Box,
  Stack,
} from "@mui/material";
import {
  Category,
  ArrowBackIos,
  CurrencyLiraOutlined,
  AcUnitOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ICollection } from "../../types";

export function FilterDrawer({
  collection,
}: {
  collection: ICollection | null;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

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

  return (
    <SwipeableDrawer
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      variant="permanent"
    >
      <Stack justifyContent="space-between">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem
              button
              key="Filters"
              onClick={() => {
                navigate(-1);
              }}
            >
              <ListItemIcon>
                <ArrowBackIos />
              </ListItemIcon>
              <ListItemText primary="Filters" />
            </ListItem>
          </List>
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
