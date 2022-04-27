import { Routes as Switch, Route } from "react-router-dom";

import Home from "../../pages/Home";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Switch>
  );
};
