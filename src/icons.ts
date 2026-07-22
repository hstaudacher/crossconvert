export const iconCodes = {
  doubleunder: 59658,
  distance: 59657,
  percent: 59656,
  barbell: 59655,
  plate: 59654,
  burpee: 59652,
  run: 59653,
  echobike: 59648,
  assaultbike: 59659,
  bikeerg: 59649,
  rower: 59650,
  skierg: 59651,
} as const;

export type CrossFitIconName = keyof typeof iconCodes;
