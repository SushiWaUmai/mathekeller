export const checkValid = (values: number[]) => {
  for (let i = 1; i <= values.length; i++) {
    const index = values.indexOf(i);
    if (index == -1) {
      return false;
    }
  }

  return true;
};

export const toPI = (values: number[]): [number, number][] => {
  let pi: [number, number][] = [];

  for (let i = 0; i < values.length; i++) {
    pi.push([i + 1, values[i]]);
  }

  return pi;
};

export const calculateSignum = (values: number[]): number => {
  const cycles = findCycles(values);
  const k = values.length - cycles.length;

  if (k % 2 == 0) {
    return 1;
  } else {
    return -1;
  }
};

export const findCycles = (values: number[]): number[][] => {
  const pi = toPI(values);

  const toBeFound = new Array(pi.length).fill(null).map((_, i) => i + 1);

  let current = 1;
  const cycles: number[][] = [];

  let cycle: number[] = [];
  while (toBeFound.length > 0) {
    while (true) {
      const idx = toBeFound.indexOf(current);
      if (idx != -1) {
        current = pi[current - 1][0];
        let next = pi[current - 1][1];

        cycle.push(current);
        toBeFound.splice(idx, 1);
        current = next;
      } else {
        cycles.push(cycle);
        cycle = [];
        current = toBeFound[0];
        break;
      }
    }
  }

  return cycles;
};
