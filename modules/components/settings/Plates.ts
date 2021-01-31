enum Plate {
  RED,
  BLUE,
  YELLOW,
  GREEN,
  WHITE,
  FRACTIONAL_RED,
  FRACTIONAL_GREEN,
  FRACTIONAL_YELLOW,
  FRACTIONAL_BLUE,
  FRACTIONAL_WHITE,
}

class PlateMapping {
  constructor(readonly plate: Plate, readonly kg: number, readonly lbs: number) {}
}

const plateMappings = [
  new PlateMapping(Plate.RED, 25, 55),
  new PlateMapping(Plate.BLUE, 20, 45),
  new PlateMapping(Plate.YELLOW, 15, 35),
  new PlateMapping(Plate.GREEN, 10, 25),
  new PlateMapping(Plate.WHITE, 5, 10),
  new PlateMapping(Plate.FRACTIONAL_RED, 2.5, 1),
  new PlateMapping(Plate.FRACTIONAL_BLUE, 2, 5),
  new PlateMapping(Plate.FRACTIONAL_YELLOW, 1.5, 0.5),
  new PlateMapping(Plate.FRACTIONAL_GREEN, 1, 2.5),
  new PlateMapping(Plate.FRACTIONAL_WHITE, 0.5, 1.25),
];

export {Plate, PlateMapping, plateMappings};
