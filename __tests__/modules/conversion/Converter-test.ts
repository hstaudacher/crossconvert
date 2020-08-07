import Unit from '../../../modules/conversion/Unit';
import Exercise from '../../../modules/conversion/Exercise';
import Conversion from '../../../modules/conversion/Conversion';
import Converter from '../../../modules/conversion/Converter';

test('converts from row to run', () => {
  const converter = new Converter(Exercise.Row, Unit.Meter, 250);

  const conversion: Conversion = converter.convertTo(Exercise.Run);

  expect(conversion.value).toEqual(200);
});
