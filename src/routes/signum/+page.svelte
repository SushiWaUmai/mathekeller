<script lang="ts">
	import Katex from "$lib/Katex.svelte";
	import SignumInput from "$lib/signum/SignumInput.svelte"
	import {calculateSignum, checkValid, findCycles} from "$lib/signum/calculateSignum";

	let values = [2, 1, 3];
	let cycles: number[][] = [];

	$: result = updateSignum(values)

	const addValue = () => {
		const nextIdx = values.length + 1;
		values.push(nextIdx);
		values = values;
	}

	const removeValue = () => {
		values.pop();
		values = values;
	}

	const updateValue = (idx: number, value: number) => {
		values[idx] = value;
		values = values;
	};

	const updateSignum = (values: number[]) => {
		if (!checkValid(values)) {
			result = undefined;
			return;
		}

		cycles = findCycles(values);
		return calculateSignum(values);
	}

	const cycleToLatex = (cycles: number[][]) => {
		let result = "";
		for (let i = 0; i < cycles.length; i++) {
			result += "(" + cycles[i].join(", ") + ")";
		}
		return result;
	}
</script>

<div class="container mx-auto px-2 py-10">
  <div class="w-full space-y-16 lg:w-2/3">
		<section class="space-y-4">
			<h1 class="h1">Signum Rechner</h1>
			<br />

			<div class="flex text-center lg:text-xl">
				<div class="flex items-center">
					<Katex math={"\\pi \\coloneqq"} />
					<Katex math={"\\Bigg("} />
				</div>
				<div class="grid overflow-scroll grid-flow-col gap-2">
					{#each values as value, idx}
						<SignumInput {idx} {value} {updateValue} />
					{/each}
				</div>
				<Katex math={"\\Bigg)"} />
			</div>

			<div class="p-4">
				<div class="btn-group variant-ghost">
					<button on:click={addValue}>
						<Katex math={"+"} />
					</button>
					<button on:click={removeValue}>
						<Katex math={"-"} />
					</button>
				</div>
			</div>

			{#if result}
				<div class="h2">
						<Katex math={"sgn(\\pi) = " + result}/>
				</div>
			{/if}
		</section>
		<hr />

		{#if result}
			<section class="space-y-8">
				<h3 class="h3">Rechenweg</h3>

				<div>
					<p>Finde die Anzahl <Katex math={"z"} /> der disjunkten Zykel von <Katex math={"\\pi"}/></p>
					<span class="text-xl">
						<Katex displayMode math={"\\pi = " + cycleToLatex(cycles) + "\\implies z = " + cycles.length}/>
					</span>
				</div>

				<div>
					<p>Sei <Katex math={"\\pi \\in S_{n}"} /> und <Katex math={"z"} /> die Anzahl der disjunkten Zykel von <Katex math={"\\pi"} /> dann gilt:</p>
					<span class="text-xl">
						<Katex displayMode math={"sgn(\\pi) = (−1)^{n−z}"} />
					</span>
				</div>

				<div>
					<p>Wir setzen einfach unsere Werte in die Formel ein.</p>
					<span class="text-xl">
						<Katex displayMode math={"sgn(\\pi) = (−1)^{" + values.length + "-" + cycles.length + "} = (-1)^{" + (values.length - cycles.length) + "} = " + result} />
					</span>
				</div>
			</section>

			<hr />
		{/if}


		<section class="space-y-3">
			<h2 class="h2">Wie berechne ich das Signum?</h2>

			<p>Das Signum ist wie das folgende definiert:</p>
			<div class="text-xl">
				<Katex displayMode math={"sgn(\\pi) \\coloneqq \\prod\\limits_{\\{i,j\\} \\in I_{n}}^{} \\frac{\\pi(i) - \\pi(j)}{i - j}"}/>
			</div>

			<p>Alternativ kann man das signum auch so berechnen:</p>
			<div class="text-xl">
				<Katex displayMode math={"sgn(\\pi) = (−1)^{n−z}"} />
			</div>
			<p>mit <Katex math={"\\pi \\in S_{n}"} /> und <Katex math={"z"} /> die Anzahl der disjunkten Zykel von <Katex math={"\\pi"} /></p>
		</section>
	</div>
</div>

