<script lang="ts">
  import "./variables.css";

  import Boxes from "./components/Boxes.svelte";
  import { onMount } from "svelte";
  import type { Coordinate } from "./lib/base/general";
  import Bar from "./components/Bar.svelte";

  const mouseButton: boolean[] = $state([false, false, false]);
  const mousePosition: Coordinate = $state({ x: -1, y: -1 });
  let cursorType: string = $state("default");

  function setCursorType(newCursorType: string) {
    cursorType = newCursorType;
  }

  function mouseMove(event: MouseEvent) {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
  }

  function mouseDown(event: MouseEvent) {
    mouseButton[event.button] = true;
  }

  function mouseUp(event: MouseEvent) {
    mouseButton[event.button] = false;
  }

  onMount(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
    };
  });
</script>

<main id="main" style={`cursor: ${cursorType}`}>
  <div id="screen"></div>
  <Bar></Bar>
  <Boxes {mouseButton} {mousePosition} {setCursorType}></Boxes>
</main>

<style>
  #screen {
    width: 100%;
    height: 100%;
    background-color: darkcyan;
  }
</style>
