import Exercise from './Exercise';
import Unit from './Unit';

export default class ExerciseConversion {
  constructor(readonly from: Exercise, readonly to: Exercise, readonly unit: Unit, readonly value: number) {}
}
