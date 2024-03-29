import { tableMapperValues } from '@skeletonlabs/skeleton';
import type { TableSource } from '@skeletonlabs/skeleton';

const vonNeumannAdder = (a: number, p: number) => {
	const table: number[][] = [];

	table.push([0, 0, 0]);
	table.push([0, a, p]);

	while (p !== 0) {
		const aTemp = a ^ p;
		const pTemp = (a & p) << 1;
		const u = (pTemp & (1 << 4)) != 0 ? 1 : 0;
		a = aTemp;
		p = pTemp & 0b1111;

		table.push([u, a, p]);
	}

	return table;
};

const parallelAdder = (a: number, p: number) => {
	const table: number[][] = [];
	table.push([0, 0, 0]);
	table.push([0, a, p]);

	a = a + p;
	p = 0;
	const u = (a & (1 << 4)) != 0 ? 1 : 0;

	table.push([u, a, p]);
	return table;
};

const serialAdder = (a: number, p: number) => {
	const table: number[][] = [];
	table.push([0, 0, 0]);

	let u = 0;
	table.push([u, a, p]);

	while (p !== 0) {
		const lastA = a & 1;
		const lastP = p & 1;

		const firstA = lastA ^ lastP ^ u;
		u = lastA + lastP + u > 1 ? 1 : 0;

		a >>= 1;
		p >>= 1;

		a += firstA << 3;
		table.push([u, a, p]);
	}

	return table;
};

export const generateNeumannTable = (a: number, p: number) => {
	const tableData = [];
	const data = vonNeumannAdder(a, p);

	for (let i = 0; i < data.length; i++) {
		const [u, a, p] = data[i];
		tableData.push({
			position: i + 1,
			u: u,
			accBin: a?.toString(2).padStart(4, '0'),
			accDec: a + (u << 4),
			pufBin: p?.toString(2).padStart(4, '0'),
			pufDec: p,
			s: p != 0 ? 1 : 0
		});
	}

	const table: TableSource = {
		head: ['U', 'Accumulator Binary', 'Accumulator', 'Puffer Binary', 'Puffer', 'S'],
		body: tableMapperValues(tableData, ['u', 'accBin', 'accDec', 'pufBin', 'pufDec', 's'])
	};

	return table;
};

const generateAdderTable = (
	a: number,
	p: number,
	adderFunc: (a: number, p: number) => number[][]
) => {
	const tableData = [];
	const data = adderFunc(a, p);

	for (let i = 0; i < data.length; i++) {
		const [u, a, p] = data[i];
		tableData.push({
			position: i + 1,
			u: u,
			accBin: a?.toString(2).padStart(4, '0'),
			accDec: a + (u << 4),
			pufBin: p?.toString(2).padStart(4, '0'),
			pufDec: p
		});
	}

	const table: TableSource = {
		head: ['U', 'Accumulator Binary', 'Accumulator', 'Puffer Binary', 'Puffer'],
		body: tableMapperValues(tableData, ['u', 'accBin', 'accDec', 'pufBin', 'pufDec'])
	};

	return table;
};

export const generateParallelAdderTable = (a: number, p: number) => {
	return generateAdderTable(a, p, parallelAdder);
};

export const generateSerialAdderTable = (a: number, p: number) => {
	return generateAdderTable(a, p, serialAdder);
};
