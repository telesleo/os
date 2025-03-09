<script lang="ts">
  import boxes from "../lib/data/box.svelte";
</script>

<div id="bar">
  {#each boxes as box}
    <div class="box"></div>
  {/each}
</div>

<style>
  #bar {
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    height: 100%;
    padding: 8px;
    border-right: 1px solid var(--black);
    z-index: 1;
  }

  .box {
    width: 30px;
    height: 30px;
    background-color: black;
  }
</style>
