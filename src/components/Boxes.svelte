<script lang="ts">
  import type BoxI from "../lib/base/box";
  import boxes from "../lib/data/box.svelte";
  import Box from "./Box.svelte";

  const { mouseButton, mousePosition } = $props();

  function setX(box: BoxI, value: number) {
    box.x = value;
  }

  function setY(box: BoxI, value: number) {
    box.y = value;
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
    ></Box>
  {/each}
</div>
