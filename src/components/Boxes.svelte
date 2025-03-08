<script lang="ts">
  import type BoxI from "../lib/base/box";
  import boxes from "../lib/data/box.svelte";
  import Box from "./Box.svelte";
  import { BOX_MIN_SIZE } from "../lib/constants/box";

  const { mouseButton, mousePosition, setCursorType } = $props();

  function setX(box: BoxI, value: number) {
    box.x = value;
  }

  function setY(box: BoxI, value: number) {
    box.y = value;
  }

  function setWidth(box: BoxI, value: number) {
    box.width = Math.max(value, BOX_MIN_SIZE);
  }

  function setHeight(box: BoxI, value: number) {
    box.height = Math.max(value, BOX_MIN_SIZE);
  }
</script>

<div id="boxes">
  {#each boxes as box}
    <Box
      {mouseButton}
      {mousePosition}
      {...box}
      setX={(value: number) => setX(box, value)}
      setY={(value: number) => setY(box, value)}
      setWidth={(value: number) => setWidth(box, value)}
      setHeight={(value: number) => setHeight(box, value)}
      {setCursorType}
    ></Box>
  {/each}
</div>
