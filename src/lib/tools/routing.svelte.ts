import type { Component } from "svelte";
import type RouteI from "../base/route";

export const routing: { routes: RouteI[]; content: Component | null } = $state({
  routes: [],
  content: null,
});

function render() {
  const currentPath = window.location.hash.slice(1);

  const currentRoute = routing.routes.find(
    (route) => route.path === currentPath,
  );

  if (!currentRoute) {
    routing.content = null;
    return;
  }

  routing.content = currentRoute.component;
}

window.addEventListener("popstate", render.bind(this));
window.addEventListener("load", render.bind(this));
