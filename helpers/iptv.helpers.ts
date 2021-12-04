export function splitEveryTwoLines(lines: string[]) {
	return lines.reduce(function (accumulator: string[][], currentValue, currentIndex: number, array: string[]) {
		if (currentIndex % 2 === 0) accumulator.push(array.slice(currentIndex, currentIndex + 2));
		return accumulator;
	}, []);
}
