<script lang="ts">
  export let content: string[];
</script>

<svelte:head>
  <meta name="keywords" content={content.join(",")} />
</svelte:head>
