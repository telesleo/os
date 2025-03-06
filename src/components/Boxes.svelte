<script lang="ts">
  import boxes from "../lib/data/box.svelte";
  import Box from "./Box.svelte";
</script>

<div id="boxes">
  {#each boxes as box}
    <Box application={box.application}></Box>
  {/each}
</div>
