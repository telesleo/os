<script lang="ts">
  import Bar from "./Bar.svelte";
  import Boxes from "./Boxes.svelte";

  const { mouseButton, mousePosition, setCursorType } = $props();
</script>

<div id="screen"></div>
<Bar></Bar>
<Boxes {mouseButton} {mousePosition} {setCursorType}></Boxes>

<style>
  #screen {
    width: 100%;
    height: 100%;
    background-color: darkcyan;
  }
</style>
