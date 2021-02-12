import AsyncStorage from '@react-native-async-storage/async-storage';

class WeightPercentageRange {
  constructor(readonly range: number[]) {}
}

class WeightPercentageRangeStore {
  public readonly defaultRange = new WeightPercentageRange([110, 100, 90, 80, 70]);

  public store = async (range: WeightPercentageRange) => {
    try {
      const jsonValue = JSON.stringify(range);
      await AsyncStorage.setItem('@mconvert.percentageRange', jsonValue);
    } catch (e) {
      throw e;
    }
  };

  public load = async <WeightPercentagesRange>() => {
    try {
      const jsonValue = await AsyncStorage.getItem('@mconvert.percentageRange');
      return jsonValue != null ? JSON.parse(jsonValue) : this.defaultRange;
    } catch (e) {
      throw e;
    }
  };
}

export {WeightPercentageRange, WeightPercentageRangeStore};
