import React from "react";
import ReactDOM from "react-dom/client";
import { MediaStreamRecorderProvider } from "./features/mediaStream/RecorderProvider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthProvider.tsx";
import { ServiceWorkerProvider } from "./features/serviceWorker/provider.tsx";

const Index = React.lazy(() => import("./pages/index.tsx"));
const SimpleRecorder = React.lazy(() => import("./pages/simple-recorder.tsx"));
const Deal = React.lazy(() => import("./pages/deal/index.tsx"));
const Images = React.lazy(() => import("./pages/deal/images.tsx"));
const Oauth = React.lazy(() => import("./pages/oauth.tsx"));
const GCS = React.lazy(() => import("./pages/gcs.tsx"));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ServiceWorkerProvider>
        <MediaStreamRecorderProvider>
          <React.Suspense fallback={<>"loading"</>}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/simple-recorder" element={<SimpleRecorder />} />
                <Route path="/deal" element={<Deal />} />
                <Route path="/deal/images" element={<Images />} />
                <Route path="/gcs" element={<GCS />} />
                <Route path="/oauth" element={<Oauth />} />
              </Routes>
            </BrowserRouter>
          </React.Suspense>
        </MediaStreamRecorderProvider>
      </ServiceWorkerProvider>
    </AuthProvider>
  </React.StrictMode>
);
