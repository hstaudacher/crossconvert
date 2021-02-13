import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bar, bars} from '../settings/Bar';
import {Plate, PlateMapping, plateMappings} from '../settings/Plates';

class PlateAvailability {
  constructor(readonly mapping: PlateMapping, readonly availability: number) {}
}

class WeightSettings {
  constructor(readonly bar: Bar, readonly availablePlates: PlateAvailability[] = []) {}

  public availability(plate: Plate) {
    const plateAvailability = this.availablePlates.find((a) => a.mapping.plate === plate);
    return plateAvailability?.availability;
  }

  public updateBar(newBar: Bar) {
    return new WeightSettings(newBar, this.availablePlates);
  }

  public updateAvailability(plate: Plate, availability: number) {
    const index = this.availablePlates.findIndex((a) => a.mapping.plate === plate);
    const mapping = this.findMapping(plate);
    this.availablePlates[index] = new PlateAvailability(mapping, availability);
    return new WeightSettings(this.bar, this.availablePlates);
  }

  private findMapping(plate: Plate) {
    const mapping = this.availablePlates.find((a) => a.mapping.plate === plate)?.mapping;
    if (typeof mapping === 'undefined') {
      throw new Error('could no find mapping for plate: ' + plate.toString());
    }
    return mapping;
  }
}

class WeightSettingsStore {
  private readonly defaultSettings = new WeightSettings(
    bars()[0],
    plateMappings().map((m) => new PlateAvailability(m, 4)),
  );

  private settings = this.defaultSettings;

  public initialize() {
    this.load().then((s) => (this.settings = s));
  }

  public getSettings() {
    return this.settings;
  }

  public store = async (settings: WeightSettings) => {
    try {
      this.settings = settings;
      const jsonValue = JSON.stringify(settings);
      await AsyncStorage.setItem('@mconvert.weightSettings', jsonValue);
    } catch (e) {
      throw e;
    }
  };

  private load = async <WeightSettings>() => {
    try {
      const jsonValue = await AsyncStorage.getItem('@mconvert.weightSettings');
      const settings = jsonValue != null ? JSON.parse(jsonValue) : this.defaultSettings;
      const bar = new Bar(settings.bar.name, settings.bar.kg, settings.bar.lb);
      return new WeightSettings(bar, settings.availablePlates);
    } catch (e) {
      throw e;
    }
  };
}

const store = new WeightSettingsStore();

export {WeightSettings, PlateAvailability, store};
