<script lang="ts">
  import boxes from "../lib/data/box.svelte";
  import time from "../lib/data/time.svelte";
</script>

<div id="bar">
  <div>
    {#each boxes.value as box}
      <div class="box"></div>
    {/each}
  </div>
  <div>
    <p>
      {new Date(time.value).toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </p>
  </div>
</div>

<style>
  #bar {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    background-color: white;
    height: 100%;
    padding: 8px;
    border-right: 1px solid var(--black);
    z-index: 1;
  }

  .box {
    width: 40px;
    height: 40px;
    background-color: black;
  }
</style>
