import { Box } from "@mui/material";
import { ReactNode } from "react";
import GlobalStyles from "../components/GlobalStyles";
import Layout from "../components/layout";

export const MainLayout = ({
  children,
  location,
}: {
  children?: ReactNode | ReactNode[];
  location?: Location;
}) => {
  return (
    <Box>
      <GlobalStyles />
      <Layout>{children}</Layout>
    </Box>
  );
};
