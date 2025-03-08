<script lang="ts">
  import { type Component } from "svelte";
  import Terminal from "./Terminal.svelte";
  import type { Coordinate } from "../lib/base/general";

  const {
    mouseButton,
    mousePosition,
    application,
    x,
    y,
    width,
    height,
    setX,
    setY,
  } = $props();
  let dragging: boolean = $state(false);
  const dragOffset: Coordinate = $state({
    x: -1,
    y: -1,
  });
  $inspect(mousePosition);
  $inspect(dragging);

  const applications: { [key: string]: Component } = {
    terminal: Terminal,
  };

  function headerMouseDown(event: MouseEvent) {
    if (event.button !== 0) {
      return;
    }

    dragging = true;
    const rect = (event.target as HTMLElement)?.getBoundingClientRect();
    const headerPosition = { x: rect.left, y: rect.top };

    dragOffset.x = event.clientX - headerPosition.x;
    dragOffset.y = event.clientY - headerPosition.y;
  }

  $effect(() => {
    if (!mouseButton[0]) {
      dragging = false;
    }
  });

  $effect(() => {
    if (!dragging) {
      return;
    }

    setX(mousePosition.x - dragOffset.x);
    setY(mousePosition.y - dragOffset.y);
  });

  const Program: Component = $state(applications[application]);
</script>

<div
  class="box"
  style={`left: ${x}px; top: ${y}px; width: ${width}px; height: ${height}px`}
>
  <div
    class="header"
    role="button"
    tabindex="0"
    onmousedown={headerMouseDown}
  ></div>
  <div class="content">
    <Program></Program>
  </div>
</div>

<style>
  .box {
    box-sizing: border-box;
    position: absolute;
    border: 1px solid var(--black);
    display: flex;
    flex-direction: column;
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
