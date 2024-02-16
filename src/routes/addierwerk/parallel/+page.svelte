<script lang="ts">
	import { generateParallelAdderTable } from '$lib/addierwerk/generateTable';
	import { Table } from '@skeletonlabs/skeleton';

	let acc: number = 0;
	let puf: number = 0;

	$: table = generateParallelAdderTable(acc, puf);
</script>

<div class="container mx-auto px-2 py-10 space-y-10">
	<h1 class="h1">Paralleladdierwerk</h1>
	<div class="flex space-x-3">
		<label class="label">
			<span>Accumulator</span>
			<input type="number" class="input" bind:value={acc} />
		</label>
		<label class="label">
			<span>Puffer</span>
			<input type="number" class="input" bind:value={puf} />
		</label>
	</div>

	<Table source={table} />
</div>
