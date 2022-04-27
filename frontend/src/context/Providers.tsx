import { AuthProvider } from "./auth";
import { GlobalProvider } from "./global";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { colors } from "../styles/colors";
import { ZeroProvider } from "./zero/ZeroProvider";

export const Providers = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <ThemeProvider theme={colors}>
      <BrowserRouter>
        <GlobalProvider>
          <AuthProvider>
            <ZeroProvider>{children}</ZeroProvider>
          </AuthProvider>
        </GlobalProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
