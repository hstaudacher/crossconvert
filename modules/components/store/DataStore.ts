import {store as rangeStore} from './WeightPercentageRangeStore';
import {store as settingsStore} from './WeightSettingsStore';

class DataStore {
  public initialize() {
    settingsStore.initialize();
    rangeStore.initialize();
  }
}

export default DataStore;
