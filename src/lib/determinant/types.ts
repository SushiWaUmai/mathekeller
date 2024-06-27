export type Matrix = number[][];

export interface CalculationStep {
	matrix: Matrix;
	cofactor: number;
	subCalculations: CalculationStep[];
}

export interface CalculationSteps {
	step: CalculationStep;
	result: number;
}
