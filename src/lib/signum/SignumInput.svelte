<script lang="ts">
	export let idx: number;
	export let value: number;
	export let updateValue: (idx: number, value: number) => void;

	const handleValueChange = (e: Event) => {
    const target = e.target as HTMLInputElement;

		const value = +target.value;
		updateValue(idx, value);
	}
</script>

<div class="grid">
	<div>{idx + 1}</div>
	<input type="number" class="input text-center w-16" on:change={handleValueChange} bind:value={value} />
</div>
