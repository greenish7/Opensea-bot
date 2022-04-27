import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { MainDrawer, FilterDrawer } from "./drawers";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const path = useLocation();
  return (
    <>
      {path.pathname.startsWith("/collection") ? (
        <FilterDrawer />
      ) : (
        <MainDrawer />
      )}
      <Main>{children}</Main>
    </>
  );
}

const Main = styled.main`
  justify-content: center;
  align-items: center;
  margin-right: 15.625rem;
`;

export default Layout;
