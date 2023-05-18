import React from "react";
import ReactDOM from "react-dom/client";
import { MediaStreamRecorderProvider } from "./features/mediaStream/RecorderProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/index.tsx";
import SimpleRecorder from "./pages/simple-recorder.tsx";
import { AuthProvider } from "./features/auth/AuthProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/simple-recorder",
    element: <SimpleRecorder />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <MediaStreamRecorderProvider>
        <RouterProvider router={router} />
      </MediaStreamRecorderProvider>
    </AuthProvider>
  </React.StrictMode>
);
