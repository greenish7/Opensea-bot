import styled from "styled-components";
import Drawer from "./Drawer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Drawer />
      <Main>{children}</Main>
    </>
  );
}

const Main = styled.main`
  width: 100vw;
  justify-content: center;
  align-items: center;
  padding-top: 0.3rem;
`;

export default Layout;
