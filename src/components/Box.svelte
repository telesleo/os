<script lang="ts">
  import type { Component } from "svelte";
  import Terminal from "./Terminal.svelte";

  const { application, x, y, width, height } = $props();
  let dragging: boolean = $state(false);

  $inspect(dragging);

  const applications: { [key: string]: Component } = {
    terminal: Terminal,
  };

  function headerMouseDown() {
    dragging = true;
  }

  function headerMouseUp() {
    dragging = false;
  }

  const Program: Component = $state(applications[application]);
</script>

<div
  class="box"
  style={`left: ${x}px; top: ${y}px; width: ${width}px; height: ${height}px`}
>
  <div
    class="header"
    onmousedown={headerMouseDown}
    onmouseup={headerMouseUp}
  ></div>
  <div class="content"><Program></Program></div>
</div>

<style>
  .box {
    position: absolute;
    border: 1px solid black;
  }

  .header {
    height: 20px;
    background-color: var(--white);
    border-bottom: 1px solid var(--black);
  }

  .content {
    height: 100%;
    overflow: scroll;
  }
</style>
