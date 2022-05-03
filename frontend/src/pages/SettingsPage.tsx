import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Switch,
} from "@mui/material";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { GlobalContext } from "../context";

export function SettingsPage() {
  const { setSelectedWallet, selectedWallet } = useContext(GlobalContext);

  const [checked, setChecked] = useState(
    selectedWallet === "metamask" ? [selectedWallet] : []
  );

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log({ newChecked });
    if (newChecked.includes("metamask")) {
      toast.info(
        "Metamask is now enabled, You can sign and send transactions in browser"
      );
      setSelectedWallet("metamask");
    } else {
      toast.warn(
        "Metamask is now disabled, We will use your backend wallet to sign and send transactions"
      );
      setSelectedWallet("backend");
    }
    setChecked(newChecked);
  };

  return (
    <List
      sx={{ bgcolor: "background.paper", color: "text.primary" }}
      subheader={<ListSubheader>My Settings</ListSubheader>}
    >
      <Divider />
      <ListItem>
        <ListItemIcon>
          <AccountBalanceWalletOutlined />
        </ListItemIcon>
        <ListItemText
          id="switch-list-label-metamask"
          primary="Use Browser Wallet"
        />
        <Switch
          edge="end"
          onChange={handleToggle("metamask")}
          checked={checked.indexOf("metamask") !== -1}
          inputProps={{
            "aria-labelledby": "switch-list-label-metamask",
          }}
        />
      </ListItem>
    </List>
  );
}
