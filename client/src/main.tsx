import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage.tsx";
import NewPage from "./pages/NewPage.tsx";
import EditPage from "./pages/EditPage.tsx";
import DetailsPage from "./pages/DetailsPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="new" element={<NewPage />} />
          <Route path="edit/:id" element={<EditPage />} />
          <Route path="details/:id" element={<DetailsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
