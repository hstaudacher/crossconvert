import {
  bars,
  defaultPercentages,
  defaultWeightSettings,
  plates,
  type PlateAvailability,
  type WeightSettings,
} from './domain/weights';

const WEIGHT_SETTINGS_KEY = 'crossconvert.weightSettings';
const PERCENTAGES_KEY = 'crossconvert.percentageRange';

export function loadWeightSettings(): WeightSettings {
  const stored = localStorage.getItem(WEIGHT_SETTINGS_KEY);
  if (!stored) {
    return structuredClone(defaultWeightSettings);
  }
  return parseStoredValue(
    WEIGHT_SETTINGS_KEY,
    stored,
    isWeightSettings,
    () => structuredClone(defaultWeightSettings),
    'weight settings',
  );
}

export function storeWeightSettings(settings: WeightSettings): void {
  localStorage.setItem(WEIGHT_SETTINGS_KEY, JSON.stringify(settings));
}

export function loadPercentages(): number[] {
  const stored = localStorage.getItem(PERCENTAGES_KEY);
  if (!stored) {
    return [...defaultPercentages];
  }
  return parseStoredValue(
    PERCENTAGES_KEY,
    stored,
    isPercentageRange,
    () => [...defaultPercentages],
    'percentage range',
  );
}

export function storePercentages(percentages: number[]): void {
  localStorage.setItem(PERCENTAGES_KEY, JSON.stringify(percentages));
}

function parseStoredValue<T>(
  key: string,
  stored: string,
  validate: (value: unknown) => value is T,
  defaultValue: () => T,
  description: string,
): T {
  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }
    return recoverInvalidValue(key, defaultValue, description);
  }
  return validate(parsed) ? parsed : recoverInvalidValue(key, defaultValue, description);
}

function recoverInvalidValue<T>(key: string, defaultValue: () => T, description: string): T {
  console.warn(`Invalid stored ${description}; restored defaults.`);
  localStorage.removeItem(key);
  return defaultValue();
}

function isPercentageRange(value: unknown): value is number[] {
  return (
    Array.isArray(value) && value.every(percentage => typeof percentage === 'number' && Number.isFinite(percentage))
  );
}

function isWeightSettings(value: unknown): value is WeightSettings {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const candidate = value as Partial<WeightSettings>;
  return (
    typeof candidate.barId === 'string' &&
    bars.some(bar => bar.id === candidate.barId) &&
    Array.isArray(candidate.availablePlates) &&
    candidate.availablePlates.every(isPlateAvailability)
  );
}

function isPlateAvailability(value: unknown): value is PlateAvailability {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const candidate = value as Partial<PlateAvailability>;
  return (
    typeof candidate.plateId === 'string' &&
    plates.some(plate => plate.id === candidate.plateId) &&
    typeof candidate.availability === 'number' &&
    candidate.availability >= 0 &&
    candidate.availability % 2 === 0
  );
}
