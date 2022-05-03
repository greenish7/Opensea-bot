import { AuthProvider } from "./auth";
import { GlobalProvider } from "./global";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { colors } from "../styles/colors";
import { ZeroProvider } from "./zeroOmni";
import { WebSocketProvider } from "./websocket";

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
            <WebSocketProvider>
              <ZeroProvider>{children}</ZeroProvider>
            </WebSocketProvider>
          </AuthProvider>
        </GlobalProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
