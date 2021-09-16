import AsyncStorage from '@react-native-async-storage/async-storage';

class WeightPercentageRange {
  constructor(readonly range: number[]) {}
}

class WeightPercentageRangeStore {
  private readonly defaultRange = new WeightPercentageRange([110, 100, 90, 80, 70]);

  private range = this.defaultRange;

  public initialize() {
    this.load().then(r => (this.range = r));
  }

  public getRange() {
    return this.range;
  }

  public store = async (range: WeightPercentageRange) => {
    try {
      this.range = range;
      const jsonValue = JSON.stringify(range);
      await AsyncStorage.setItem('@mconvert.percentageRange', jsonValue);
    } catch (e) {
      throw e;
    }
  };

  private load = async <WeightPercentagesRange>() => {
    try {
      const jsonValue = await AsyncStorage.getItem('@mconvert.percentageRange');
      return jsonValue != null ? JSON.parse(jsonValue) : this.defaultRange;
    } catch (e) {
      throw e;
    }
  };
}

const store = new WeightPercentageRangeStore();

export {WeightPercentageRange, store};
