import type { CalculationSteps, CalculationStep } from './types';

const renderMatrix = (matrix: number[][]): string => {
	return `\\begin{vmatrix}${matrix.map((row) => row.join(' & ')).join(' \\\\ ')}\\end{vmatrix}`;
};

export const renderDeterminantSteps = (calculation: CalculationSteps): string[] => {
	const { step, result } = calculation;
	const queue: { cofactor: number; step: CalculationStep; depth: number }[] = [
		{ cofactor: 1, step, depth: 0 }
	];
	const depthExpressions: { [depth: number]: string[] } = {};

	while (queue.length > 0) {
		const { cofactor, step, depth } = queue.shift()!;

		if (!depthExpressions[depth]) {
			depthExpressions[depth] = [];
		}

		if (depth === 0) {
			depthExpressions[depth].push(`${renderMatrix(step.matrix)}`);
		} else {
			if (cofactor === 1) {
				depthExpressions[depth].push(
					`${step.cofactor >= 0 ? step.cofactor : '(' + step.cofactor + ')'}${renderMatrix(
						step.matrix
					)}`
				);
			} else {
				depthExpressions[depth].push(
					`${cofactor}\\left(${
						step.cofactor >= 0 ? step.cofactor : '(' + step.cofactor + ')'
					}${renderMatrix(step.matrix)}\\right)`
				);
			}
		}

		if (step.subCalculations.length > 0) {
			step.subCalculations.forEach((subStep) => {
				queue.push({
					cofactor: step.cofactor * cofactor,
					step: subStep,
					depth: depth + 1
				});
			});
		}
	}

	const renderedSteps = Object.values(depthExpressions).map((x) => x.join('+'));
	renderedSteps.push(`${result}`);

	return renderedSteps;
};
