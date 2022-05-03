import { useState } from "react";
import {
  Button,
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
  Search,
  Collections,
  Category,
  Refresh,
  Update,
  Settings,
  LocalFireDepartment,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function MainDrawer() {
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
            <ListItem button key="Refresh">
              <ListItemIcon>
                <Refresh />
              </ListItemIcon>
              <ListItemText primary="Refresh" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              key="Trending"
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemIcon>
                <LocalFireDepartment />
              </ListItemIcon>
              <ListItemText primary="Trending" />
            </ListItem>
            <Divider />
            <ListItem
              button
              key="Search"
              onClick={() => {
                navigate("/search");
              }}
            >
              <ListItemIcon>
                <Search />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
            <Divider />
            <ListItem
              button
              key="My Collections"
              onClick={() => {
                navigate("/mycollections");
              }}
            >
              <ListItemIcon>
                <Collections />
              </ListItemIcon>
              <ListItemText primary="My Collections" />
            </ListItem>
            <Divider />
            <ListItem
              button
              key="Monitered Assets"
              onClick={() => {
                navigate("/tracking");
              }}
            >
              <ListItemIcon>
                <Category />
              </ListItemIcon>
              <ListItemText primary="Monitered Assets" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              key="History"
              onClick={() => {
                navigate("/trade-history");
              }}
            >
              <ListItemIcon>
                <Update />
              </ListItemIcon>
              <ListItemText primary="History" />
            </ListItem>
          </List>
        </Box>
        <Box>
          <Divider />
          <List>
            <ListItem
              button
              key="Settings"
              onClick={() => {
                navigate("/settings");
              }}
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Box>
      </Stack>
    </SwipeableDrawer>
  );
}
