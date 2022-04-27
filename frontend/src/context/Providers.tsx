import { AuthProvider } from "./auth";
import { GlobalProvider } from "./global";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { colors } from "../styles/colors";

export const Providers = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <ThemeProvider theme={colors}>
      <BrowserRouter>
        <GlobalProvider>
          <AuthProvider>{children}</AuthProvider>
        </GlobalProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
