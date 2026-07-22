import {defaultPercentages, defaultWeightSettings} from './domain/weights';
import {loadPercentages, loadWeightSettings, storePercentages, storeWeightSettings} from './storage';

describe('browser persistence', () => {
  test('loads defaults when no settings exist', () => {
    expect(loadWeightSettings()).toEqual(defaultWeightSettings);
    expect(loadPercentages()).toEqual(defaultPercentages);
  });

  test('round-trips equipment and percentages', () => {
    const settings = {...defaultWeightSettings, barId: '15-33'};
    storeWeightSettings(settings);
    storePercentages([95, 75]);
    expect(loadWeightSettings()).toEqual(settings);
    expect(loadPercentages()).toEqual([95, 75]);
  });

  test('recovers from schema-incompatible persisted data', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    localStorage.setItem('crossconvert.weightSettings', '{"barId":"missing","availablePlates":[]}');
    localStorage.setItem('crossconvert.percentageRange', '"not-an-array"');
    expect(loadWeightSettings()).toEqual(defaultWeightSettings);
    expect(loadPercentages()).toEqual(defaultPercentages);
    expect(localStorage.getItem('crossconvert.weightSettings')).toBeNull();
    expect(localStorage.getItem('crossconvert.percentageRange')).toBeNull();
    expect(warning).toHaveBeenCalledTimes(2);
  });

  test('recovers from malformed JSON', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    localStorage.setItem('crossconvert.weightSettings', '{');
    expect(loadWeightSettings()).toEqual(defaultWeightSettings);
    expect(localStorage.getItem('crossconvert.weightSettings')).toBeNull();
    expect(warning).toHaveBeenCalledOnce();
  });
});
