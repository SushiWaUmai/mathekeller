<script lang="ts">
	import { AppBar } from "@skeletonlabs/skeleton";
</script>

<AppBar class="relative">
  <svelte:fragment slot="lead">
    <div class="flex items-center">
      <a class="text-xl font-bold uppercase" href="/">MatheKeller</a>
    </div>
  </svelte:fragment>

  <nav slot="trail">
  </nav>
</AppBar>
