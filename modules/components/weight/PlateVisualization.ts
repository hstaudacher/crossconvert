import {Plate} from '../settings/Plates';

const getPlateColor = (plate: Plate): string => {
  switch (plate) {
    case Plate.RED:
    case Plate.FRACTIONAL_RED:
      return '#af2e33';
    case Plate.BLUE:
    case Plate.FRACTIONAL_BLUE:
      return '#33618f';
    case Plate.YELLOW:
    case Plate.FRACTIONAL_YELLOW:
      return '#e8ae28';
    case Plate.GREEN:
    case Plate.FRACTIONAL_GREEN:
      return '#36aa40';
    default:
      return '#d7d7d7';
  }
};

const getPlateFontSize = (plate: Plate): number => {
  switch (plate) {
    case Plate.RED:
    case Plate.BLUE:
    case Plate.YELLOW:
    case Plate.GREEN:
      return 38;
    case Plate.WHITE:
      return 33;
    case Plate.FRACTIONAL_WHITE:
      return 24;
    default:
      return 28;
  }
};

export {getPlateColor, getPlateFontSize};
