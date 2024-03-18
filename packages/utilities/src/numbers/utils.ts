type CalcTimeTuple = readonly [number, string, number];

export function calculateUnitTime(val: number, valUnit: number, unit: string, willUseRemaining = false): CalcTimeTuple {
  const time = Math.floor(val / valUnit);
  const remainingVal = val % valUnit;

  if (time) {
    return [time, `${unit}${Math.abs(time) !== 1 || (willUseRemaining && remainingVal) ? 's' : ''}`, remainingVal];
  }

  return [0, '', remainingVal];
}
