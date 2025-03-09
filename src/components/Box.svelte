<script lang="ts">
  import { type Component } from "svelte";
  import Terminal from "./Terminal.svelte";
  import type { Coordinate } from "../lib/base/general";
  import { BOX_MIN_SIZE, BOX_RESIZE_AREA_SIZE } from "../lib/constants/box";

  const {
    mouseButton,
    mousePosition,
    application,
    id,
    x,
    y,
    width,
    height,
    setX,
    setY,
    setWidth,
    setHeight,
    setCursorType,
    setHidden,
    quitBox,
  } = $props();
  let dragging: boolean = $state(false);
  const dragOffset: Coordinate = $state({
    x: -1,
    y: -1,
  });

  const rectangle: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  } = $derived({
    top: y,
    bottom: y + height,
    left: x,
    right: x + width,
  });

  let resizing: boolean = $state(false);
  let resizeDirection: number = $state(0);
  const resizeRef: Coordinate = $state({ x: -1, y: -1 });

  const applications: { [key: string]: Component } = {
    terminal: Terminal,
  };

  function headerMouseDown(event: MouseEvent) {
    if (event.button !== 0) {
      return;
    }

    dragging = true;
    dragOffset.x = event.clientX - rectangle.left;
    dragOffset.y = event.clientY - rectangle.top;
  }

  function onResizeMouseMove() {
    if (resizing) {
      return;
    }

    const top = mousePosition.y < rectangle.top;
    const bottom = mousePosition.y > rectangle.bottom;
    const left = mousePosition.x < rectangle.left;
    const right = mousePosition.x > rectangle.right;

    const topLeft = top && left;
    const topRight = top && right;
    const bottomRight = bottom && right;
    const bottomLeft = bottom && left;

    let direction = -1;

    if (topLeft) direction = 0;
    else if (topRight) direction = 1;
    else if (bottomRight) direction = 2;
    else if (bottomLeft) direction = 3;
    else if (top) direction = 4;
    else if (bottom) direction = 5;
    else if (left) direction = 6;
    else if (right) direction = 7;

    resizeDirection = direction;
  }

  function onReiszeMouseDown() {
    resizing = true;
    resizeRef.x = x + width;
    resizeRef.y = y + height;
  }

  function onMouseLeave() {
    if (resizing) {
      return;
    }

    resizeDirection = -1;
  }

  $effect(() => {
    if (resizeDirection === 0 || resizeDirection === 2) {
      setCursorType("se-resize");
    } else if (resizeDirection === 1 || resizeDirection === 3) {
      setCursorType("sw-resize");
    } else if (resizeDirection === 4 || resizeDirection === 5) {
      setCursorType("s-resize");
    } else if (resizeDirection === 6 || resizeDirection === 7) {
      setCursorType("w-resize");
    } else {
      setCursorType("default");
    }
  });

  $effect(() => {
    if (!mouseButton[0]) {
      dragging = false;
      resizing = false;
      resizeDirection = -1;
    }
  });

  $effect(() => {
    if (!resizing) {
      return;
    }

    let newX = x;
    let newY = y;
    let newWidth = width;
    let newHeight = height;

    if (
      resizeDirection === 1 ||
      resizeDirection === 2 ||
      resizeDirection === 7
    ) {
      newWidth = mousePosition.x - rectangle.left;
    }
    if (
      resizeDirection === 2 ||
      resizeDirection === 3 ||
      resizeDirection === 5
    ) {
      newHeight = mousePosition.y - rectangle.top;
    }
    if (
      resizeDirection === 0 ||
      resizeDirection === 3 ||
      resizeDirection === 6
    ) {
      newX = Math.min(mousePosition.x, resizeRef.x - BOX_MIN_SIZE);
      newWidth = resizeRef.x - mousePosition.x;
    }
    if (
      resizeDirection === 0 ||
      resizeDirection === 1 ||
      resizeDirection === 4
    ) {
      newY = Math.min(mousePosition.y, resizeRef.y - BOX_MIN_SIZE);
      newHeight = resizeRef.y - mousePosition.y;
    }

    setX(newX);
    setY(newY);
    setWidth(newWidth);
    setHeight(newHeight);
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
  class="resize"
  role="button"
  tabindex="0"
  onmousemove={onResizeMouseMove}
  onmouseleave={onMouseLeave}
  onmousedown={onReiszeMouseDown}
  style={`left: ${x - BOX_RESIZE_AREA_SIZE}px;
  top: ${y - BOX_RESIZE_AREA_SIZE}px;
  width: ${width}px;
  height: ${height}px;
  padding: ${BOX_RESIZE_AREA_SIZE}px`}
>
  <div class="box">
    <div
      class="header"
      role="button"
      tabindex="0"
      onmousedown={headerMouseDown}
    >
      <div class="header-info"></div>
      <div class="header-buttons">
        <button
          class="header-button-hide"
          onclick={() => {
            setHidden(true);
          }}>_</button
        >
        <button
          class="header-button-quit"
          onclick={() => {
            quitBox(id);
          }}>x</button
        >
      </div>
    </div>
    <div class="content">
      <Program></Program>
    </div>
  </div>
</div>

<style>
  .resize {
    position: absolute;
  }

  .box {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    outline: 1px solid var(--black);
    display: flex;
    flex-direction: column;
    user-select: none;
    -webkit-user-drag: none;
    pointer-events: auto;
  }

  .header {
    flex-shrink: 0;
    background-color: var(--white);
    border-bottom: 1px solid var(--black);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
  }

  .header-buttons {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }

  .header button {
    padding: 0;
    border: 0;
    width: 20px;
    height: 20px;
    background-color: var(--lightgray);
    font-weight: 500;
  }

  .content {
    overflow: hidden;
    height: 100%;
    max-height: 100%;
  }
</style>
