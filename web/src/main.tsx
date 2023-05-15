import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RecorderProvider } from "./features/recorder/RecorderProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecorderProvider>
      <App />
    </RecorderProvider>
  </React.StrictMode>
);
