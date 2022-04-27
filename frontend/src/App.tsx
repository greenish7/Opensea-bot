import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { Routes } from "./components";
import { MainLayout } from "./layouts";

function App() {
  return (
    <MainLayout>
      <Routes />
      <ToastContainer />
    </MainLayout>
  );
}

export default App;
