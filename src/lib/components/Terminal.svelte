<script lang="ts">
  let command = $state("");

  function execute() {
    console.log(command);
  }

  function onkeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      execute();
    }
  }
</script>

<input type="text" {onkeydown} bind:value={command} />