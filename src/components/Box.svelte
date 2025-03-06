<script lang="ts">
  import type { Component } from "svelte";
  import Terminal from "./Terminal.svelte";

  const { application } = $props();

  const applications: { [key: string]: Component } = {
    terminal: Terminal,
  };

  const Program: Component = $state(applications[application]);
</script>

<div>
  <Program></Program>
</div>
