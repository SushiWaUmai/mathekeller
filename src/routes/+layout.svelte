<script lang="ts">
  import "../app.css";
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import NProgress from "$lib/NProgress.svelte"
	import Footer from "$lib/Footer.svelte";
</script>

<NProgress />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>Skeleton</AppBar>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter">
		<!-- <Footer /> -->
	</svelte:fragment>
</AppShell>
