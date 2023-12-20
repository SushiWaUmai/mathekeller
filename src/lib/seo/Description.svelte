<script lang="ts">
  export let content: string;
</script>

<svelte:head>
  <meta name="description" {content} />
  <meta property="og:description" {content} />
  <meta name="twitter:description" {content} />
</svelte:head>
