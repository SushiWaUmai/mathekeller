<script lang="ts">
  export let content: string;
</script>

<svelte:head>
  <meta name="twitter:image" {content} />
  <meta property="og:image" {content} />
</svelte:head>
