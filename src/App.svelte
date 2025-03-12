<script lang="ts">
  import "./variables.css";

  import Main from "./components/Main.svelte";
  import Terminal from "./components/Terminal.svelte";
  import { routing } from "./lib/tools/routing.svelte";

  routing.routes = [
    {
      path: "",
      component: Main,
    },
    {
      path: "terminal",
      component: Terminal,
    },
  ];

  $inspect(routing);
</script>

<main>
  <routing.content></routing.content>
</main>
