import type { Component } from "svelte";

export default interface RouteI {
  path: string;
  component: Component;
}
