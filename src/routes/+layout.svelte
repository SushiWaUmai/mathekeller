<script lang="ts">
  import "../app.css";
	import { AppShell } from '@skeletonlabs/skeleton';
	import NProgress from "$lib/NProgress.svelte"
	import Footer from "$lib/Footer.svelte";
	import Header from "$lib/Header.svelte";
</script>

<NProgress />

<AppShell>
	<svelte:fragment slot="header">
		<Header/>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
