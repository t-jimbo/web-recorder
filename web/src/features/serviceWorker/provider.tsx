import { useEffect, useState } from "react";

export type ServiceWorkerProviderProps = React.PropsWithChildren;

export const ServiceWorkerProvider: React.FC<ServiceWorkerProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      const sw = await init();
      setLoading(false);
      setError(
        sw === null ? new Error("Failed to initialize ServiceWorker") : null
      );
    })();
  }, []);

  if (loading) return <div>Initializing ServiceWorker...</div>;
  if (error) return <div>{error.message}</div>;

  return <>{children}</>;
};

const init = async () => {
  try {
    const serviceWorkerRegistration =
      await window.navigator.serviceWorker.register("./service-worker.js", {
        scope: "/",
      });

    if (serviceWorkerRegistration.installing) {
      console.log("initializing Service Worker...", serviceWorkerRegistration);

      const installingServiceWorker = serviceWorkerRegistration.installing;
      installingServiceWorker.addEventListener("statechange", (event) => {
        console.log("installing...", installingServiceWorker.state, event); // (installing) → installed → activating → activated
      });
    } else {
      // 2回目以降は `serviceWorkerRegistration.installing` は `null` になっており `active` プロパティの方に ServiceWorker が格納されている模様
      console.log(
        "Service Worker is already installed",
        serviceWorkerRegistration
      );
    }

    return navigator.serviceWorker.ready;
  } catch (e) {
    console.warn(e);
    return null;
  }
};
