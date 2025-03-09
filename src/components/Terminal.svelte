<script lang="ts">
  import { onMount } from "svelte";
  import executeCommand from "../lib/tools/execute-command";

  let path: string = $state("/");
  let currentInput: string = $state("");
  let history: { input: boolean; data: string }[] = $state([]);

  let inputRef: HTMLElement;

  function onClick() {
    inputRef.focus();
  }

  function clear() {
    history = [];
  }

  function setPath(newPath: string) {
    path = newPath;
  }

  function handleInput() {
    const output = executeCommand(currentInput, path, setPath);
    history.push({ input: true, data: currentInput });
    history.push({ input: false, data: output.message });
    currentInput = "";

    if (output.options.clear) {
      clear();
    }
  }

  function inputKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      handleInput();
    }
  }

  onMount(() => {
    inputRef.focus();
  });
</script>

<div
  class="terminal"
  role="button"
  tabindex="0"
  onclick={onClick}
  onkeydown={(event) => {
    if (event.key === "Enter") onClick();
  }}
>
  {#if history.length > 0}
    <ul class="history-list">
      {#each history as historyPiece}
        <li class={historyPiece.input ? "history-input" : "history-output"}>
          {historyPiece.data}
        </li>
      {/each}
    </ul>
  {/if}
  <input
    class="input"
    type="text"
    bind:value={currentInput}
    onkeydown={inputKeyDown}
    bind:this={inputRef}
  />
</div>

<style>
  .terminal {
    box-sizing: border-box;
    min-height: 100%;
    min-width: 100%;
    width: fit-content;
    height: fit-content;
    background-color: var(--black);
    color: var(--white);
    padding: var(--padding);
  }

  .history-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .input {
    width: 100%;
    padding: 0;
    outline: none;
    border: none;
    background-color: var(--black);
    color: var(--white);
  }

  .history-input {
    color: gray;
  }

  .history-output {
    color: var(--white);
  }
</style>
