import type { CalculationStep, CalculationSteps, Matrix } from './types';

const getSubMatrix = (matrix: Matrix, row: number, col: number): Matrix => {
	return matrix.filter((_, r) => r !== row).map((rowArr) => rowArr.filter((_, c) => c !== col));
};

const countZeros = (arr: number[]): number => {
	return arr.filter((num) => num === 0).length;
};

const findOptimalRowOrCol = (matrix: Matrix): { isRow: boolean; index: number } => {
	const rowZeroCounts = matrix.map(countZeros);
	const colZeroCounts = matrix[0].map((_, colIndex) =>
		countZeros(matrix.map((row) => row[colIndex]))
	);

	const maxRowZeros = Math.max(...rowZeroCounts);
	const maxColZeros = Math.max(...colZeroCounts);

	if (maxRowZeros >= maxColZeros) {
		return { isRow: true, index: rowZeroCounts.indexOf(maxRowZeros) };
	} else {
		return { isRow: false, index: colZeroCounts.indexOf(maxColZeros) };
	}
};

const calculateDeterminantRecursive = (matrix: Matrix, cofactor: number): CalculationSteps => {
	if (matrix.length === 1) {
		return {
			step: {
				cofactor: cofactor,
				matrix: matrix,
				subCalculations: []
			},
			result: matrix[0][0]
		};
	}

	if (matrix.length === 2) {
		return {
			step: {
				cofactor: cofactor,
				matrix: matrix,
				subCalculations: []
			},
			result: matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1]
		};
	}

	const { isRow, index } = findOptimalRowOrCol(matrix);
	let determinant = 0;
	const step: CalculationStep = {
		matrix: matrix,
		cofactor: cofactor,
		subCalculations: []
	};

	if (isRow) {
		for (let col = 0; col < matrix.length; col++) {
			if (matrix[index][col] !== 0) {
				const subMatrix = getSubMatrix(matrix, index, col);
				const cofactor = matrix[index][col] * Math.pow(-1, index + col);
				const subDetCalculation = calculateDeterminantRecursive(subMatrix, cofactor);
				const subDeterminant = subDetCalculation.result;
				determinant += cofactor * subDeterminant;

				step.subCalculations.push(subDetCalculation.step);
			}
		}
	} else {
		for (let row = 0; row < matrix.length; row++) {
			if (matrix[row][index] !== 0) {
				const subMatrix = getSubMatrix(matrix, row, index);
				const cofactor = matrix[row][index] * Math.pow(-1, row + index);
				const subDetCalculation = calculateDeterminantRecursive(subMatrix, cofactor);
				const subDeterminant = subDetCalculation.result;
				determinant += cofactor * subDeterminant;

				step.subCalculations.push(subDetCalculation.step);
			}
		}
	}

	return {
		step: step,
		result: determinant
	};
};

export const calculateDeterminant = (matrix: Matrix) => {
	return calculateDeterminantRecursive(matrix, 1);
};
