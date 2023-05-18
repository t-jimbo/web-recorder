import React from "react";
import ReactDOM from "react-dom/client";
import { MediaStreamRecorderProvider } from "./features/mediaStream/RecorderProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthProvider.tsx";
import Index from "./pages/index.tsx";
import SimpleRecorder from "./pages/simple-recorder.tsx";
import Deal from "./pages/deal/index.tsx";
import Images from "./pages/deal/images.tsx";
import { Layout } from "./features/mediaStream/Layout.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/simple-recorder",
        element: <SimpleRecorder />,
      },
      {
        path: "/deal",
        element: <Deal />,
      },
      { path: "/deal/images", element: <Images /> },
    ],
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
