import { ChangeEvent, FormEvent, useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Box, AppBar, Toolbar, InputBase } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { GlobalContext, ZeroContext } from "../context";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginTop: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100% !important",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100% !important",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export function SearchAppBar({
  category,
}: {
  category: "collection" | "asset";
}) {
  const { searchCollection, searchAsset } = useContext(ZeroContext);

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    let value = e.target.value || "";

    if (value.trim()) {
      if (value.startsWith("http")) {
        value = value.split("/").pop() || "";
      }

      // search collection
      if (category === "collection") {
        value && searchCollection(value);
      } else if (category === "asset") {
        value && searchAsset(value);
      }
    }
  };
  return (
    <Box>
      <AppBar position="static" color="default" enableColorOnDark>
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            {category === "collection" && (
              <StyledInputBase
                placeholder="Search collection by name or slug"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => handleChange(e)}
              />
            )}
            {category === "asset" && (
              <StyledInputBase
                placeholder="Search asset by name or address"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => handleChange(e)}
              />
            )}
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
