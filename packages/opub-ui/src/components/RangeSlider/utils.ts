function linearScale(
  input: readonly [number, number],
  output: readonly [number, number]
) {
  return function (value: number) {
    if (input[0] === input[1] || output[0] === output[1]) {
      return output[0];
    }
    var ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}

export function getThumbInBoundsOffset(width: number, left: number) {
  const halfWidth = width / 2;
  const halfPercent = 50;
  const offset = linearScale([0, halfPercent], [0, halfWidth]);
  return halfWidth - offset(left);
}
