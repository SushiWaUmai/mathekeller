<script lang="ts">
  export let content: string;
</script>

<svelte:head>
  <title>{content}</title>
  <meta name="title" {content} />
  <meta property="og:title" {content} />
  <meta name="twitter:title" {content} />
</svelte:head>
