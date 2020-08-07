import Exercise from './Exercise';
import Unit from './Unit';
import Conversion from './Conversion';

class Converter {
  readonly #from: Exercise;
  readonly #unit: Unit;
  readonly #value: number;

  constructor(from: Exercise, unit: Unit, value: number) {
    this.#from = from;
    this.#unit = unit;
    this.#value = value;
  }

  convertTo(to: Exercise): Conversion {
    return new Conversion(this.#from, to, this.#unit, this.#value);
  }
}

export default Converter;
