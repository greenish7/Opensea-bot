import { Routes as Switch, Route } from "react-router-dom";

import {
  MyCollectionPage,
  CollectionPage,
  HomePage,
  SearchPage,
} from "../../pages";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<HomePage />} />
      <Route path="/mycollections" element={<MyCollectionPage />} />
      <Route path="/collection/:id" element={<CollectionPage />} />
      <Route path="/search" element={<SearchPage />} />
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
