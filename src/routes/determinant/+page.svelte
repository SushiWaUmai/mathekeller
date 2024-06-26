<script lang="ts">
	import Katex from '$lib/Katex.svelte';
	import Title from '$lib/seo/Title.svelte';
	import Description from '$lib/seo/Description.svelte';
	import Keywords from '$lib/seo/Keywords.svelte';
	import * as math from 'mathjs';

	let value = '';

	const parseMatrix = (value: string) => {
		const parsed = value
			.trim()
			.split('\n')
			.map((row) =>
				row
					.trim()
					.split(' ')
					.filter((x) => x !== '')
					.map(Number)
			);
		try {
			return math.matrix(parsed);
		} catch (e) {
			return null;
		}
	};

	const calculateDeterminant = (matrix: math.Matrix) => {
		try {
			return math.det(matrix);
		} catch (e) {
			console.log(e);
			return null;
		}
	};

	$: matrix = parseMatrix(value);
	$: result = matrix !== null ? calculateDeterminant(matrix) : null;
</script>

<svelte:head>
	<Title content="MatheKeller | Determinant Rechner" />
	<Description
		content="Nutze den MatheKeller Signum-Rechner für schnelle und genaue Berechnungen des Signums von Permutationen in der Algebra. Ideal für Studierende und Lehrkräfte, die sich mit Diskrete Mathematik beschäftigen."
	/>
	<Keywords
		content={[
			'Determinanten-Rechner',
			'Online-Tool',
			'Matrix',
			'Lineare Algebra',
			'Algebra',
			'Mathematik'
		]}
	/>
</svelte:head>

<div class="container mx-auto px-2 py-10">
	<div class="w-full space-y-16 lg:w-2/3">
		<section class="space-y-4">
			<h1 class="h1">Determinanten Rechner</h1>
			<br />

			<div class="flex place-items-center lg:text-xl">
				<Katex math={'\\Bigg('} />
				<textarea class="textarea h-24 w-32" bind:value />
				<Katex math={'\\Bigg)'} />
			</div>

			{#if result !== null}
				<div class="h2">
					<Katex math={`det(${math.parse(matrix ? matrix.toString() : '').toTex()}) = ${result}`} />
				</div>
			{/if}
		</section>
	</div>
</div>
