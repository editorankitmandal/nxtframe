import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  // No React Query: the site has no data fetching, and leaving it out keeps ~12 KB of unused
  // code out of the first download. Add a per-request QueryClient here if data loading arrives.
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
