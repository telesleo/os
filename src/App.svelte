<script lang="ts">
  import "./variables.css";

  import Main from "./components/Main.svelte";
  import { onMount } from "svelte";
  import type { Coordinate } from "./lib/base/general";
  import storage from "./lib/data/storage.svelte";
  import { DEFAULT_STORAGE } from "./lib/constants/storage";

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

  function saveStorage() {
    if (storage.value === null) {
      return;
    }

    localStorage.setItem("storage", JSON.stringify(storage.value));
  }

  function loadStorage() {
    const storageData = localStorage.getItem("storage");
    if (storageData) {
      const storageDataParsed = JSON.parse(storageData);
      storage.value = storageDataParsed;
    } else {
      storage.value = DEFAULT_STORAGE;
    }
  }

  $effect(() => {
    saveStorage();
  });

  onMount(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    loadStorage();

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
    };
  });
</script>

<main style={`cursor: ${cursorType}`}>
  <Main {mouseButton} {mousePosition} {setCursorType}></Main>
</main>
