<script lang="ts">
	import Katex from '$lib/Katex.svelte';
	import Title from '$lib/seo/Title.svelte';
	import Description from '$lib/seo/Description.svelte';
	import Keywords from '$lib/seo/Keywords.svelte';
	import { calculateDeterminant } from '$lib/determinant/calculateDeterminant';
	import { renderDeterminantSteps } from '$lib/determinant/renderDeterminant';

	let value = '';

	const parseSquareMatrix = (value: string): number[][] | null => {
		const rows = value
			.trim()
			.split('\n')
			.map((row) => row.trim().split(/\s+/).map(Number));

		const numRows = rows.length;
		if (numRows === 0) return null;

		const numCols = rows[0].length;
		if (rows.some((row) => row.length !== numCols)) return null;
		if (numRows !== numCols) return null;

		return rows;
	};

	$: matrix = parseSquareMatrix(value);
	$: result = matrix !== null ? calculateDeterminant(matrix) : null;
	$: renderedSteps = result !== null ? renderDeterminantSteps(result) : null;
</script>

<svelte:head>
	<Title content="MatheKeller | Determinant Rechner" />
	<Description
		content="Nutze den MatheKeller Determinanten-Rechner für schnelle und genaue Berechnungen des Determinanten von Matrizen in der Linearen Algebra. Ideal für Studierende und Lehrkräfte, die sich mit Lineare Algebra beschäftigen."
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
	<div class="w-full space-y-16">
		<section class="space-y-4">
			<h1 class="h1">Determinanten Rechner</h1>
			<br />

			<div class="h2 flex place-items-center lg:text-xl">
				<Katex math={'A := \\Bigg('} />
				<textarea
					placeholder={` 0 -2  3\n-4  8 -7\n 2 -8  5`}
					class="textarea h-24 w-32 font-mono"
					bind:value
				/>
				<Katex math={'\\Bigg)'} />
			</div>

			{#if result !== null}
				<div class="h2">
					<Katex math={`det(A) = ${result.result}`} />
				</div>
			{/if}
		</section>
		{#if renderedSteps !== null}
			<section class="space-y-8">
				<h3 class="h3">Rechenweg</h3>
				<div>
					<p>Berechne die determinante durch die Laplace Entwicklung.</p>
				</div>

				<div class="space-y-4">
					<Katex math={`det(A)`} />
					{#each renderedSteps as step}
						<div>
							<Katex math={`= ${step}`} />
						</div>
					{/each}
				</div>
			</section>
		{/if}
	</div>
</div>
