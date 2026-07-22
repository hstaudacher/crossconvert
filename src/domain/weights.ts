import {WeightConversion, WeightConverter, WeightUnit} from './conversion';
import {parseValue, type ConversionConfiguration} from './options';

export interface Bar {
  id: string;
  name: string;
  kg: number;
  lb: number;
}

export type PlateId =
  | 'red'
  | 'blue'
  | 'yellow'
  | 'green'
  | 'white'
  | 'fractional-red'
  | 'fractional-blue'
  | 'fractional-yellow'
  | 'fractional-green'
  | 'fractional-white';

export interface PlateDefinition {
  id: PlateId;
  kg: number;
  lb: number;
  weighting: number;
  color: string;
  size: number;
}

export interface PlateAvailability {
  plateId: PlateId;
  availability: number;
}

export interface WeightSettings {
  barId: string;
  availablePlates: PlateAvailability[];
}

export interface WeightPercentage {
  percentage: number;
  conversion: WeightConversion;
}

export class PlateGroup {
  constructor(
    readonly definition: PlateDefinition,
    readonly amount: number,
  ) {}
}

export class PlateDistribution {
  constructor(
    readonly plates: number[],
    readonly unit: WeightUnit,
    readonly completelyDistributed = true,
  ) {}

  getPlateGroups(): PlateGroup[] {
    return plates
      .map(definition => {
        const weight = this.unit === WeightUnit.Kilogram ? definition.kg : definition.lb;
        return new PlateGroup(definition, this.plates.filter(plate => plate === weight).length);
      })
      .filter(group => group.amount > 0)
      .sort((left, right) => {
        const leftWeight = this.unit === WeightUnit.Kilogram ? left.definition.kg : left.definition.lb;
        const rightWeight = this.unit === WeightUnit.Kilogram ? right.definition.kg : right.definition.lb;
        return rightWeight - leftWeight;
      });
  }
}

export const bars: Bar[] = [
  {id: '20-45', name: '20kg/45lb', kg: 20, lb: 45},
  {id: '15-33', name: '15kg/33lb', kg: 15, lb: 33},
  {id: '16-35', name: '16kg/35lb', kg: 16, lb: 35},
  {id: '12-25', name: '12kg/25lb', kg: 12, lb: 25},
];

export const plates: PlateDefinition[] = [
  {id: 'red', kg: 25, lb: 55, weighting: 190, color: '#af2e33', size: 38},
  {id: 'blue', kg: 20, lb: 45, weighting: 200, color: '#33618f', size: 38},
  {id: 'yellow', kg: 15, lb: 35, weighting: 150, color: '#e8ae28', size: 38},
  {id: 'green', kg: 10, lb: 25, weighting: 100, color: '#36aa40', size: 38},
  {id: 'white', kg: 5, lb: 10, weighting: 15, color: '#d7d7d7', size: 33},
  {id: 'fractional-red', kg: 2.5, lb: 1, weighting: 5, color: '#af2e33', size: 28},
  {id: 'fractional-blue', kg: 2, lb: 5, weighting: 10, color: '#33618f', size: 28},
  {id: 'fractional-yellow', kg: 1.5, lb: 0.5, weighting: 2, color: '#e8ae28', size: 28},
  {id: 'fractional-green', kg: 1, lb: 2.5, weighting: 3, color: '#36aa40', size: 28},
  {id: 'fractional-white', kg: 0.5, lb: 1.25, weighting: 1, color: '#d7d7d7', size: 24},
];

export const defaultWeightSettings: WeightSettings = {
  barId: bars[0].id,
  availablePlates: plates.map(plate => ({plateId: plate.id, availability: 4})),
};

export const defaultPercentages = [110, 100, 90, 80, 70];

export function getBar(settings: WeightSettings): Bar {
  const bar = bars.find(candidate => candidate.id === settings.barId);
  if (!bar) {
    throw new Error(`Unknown bar setting: ${settings.barId}`);
  }
  return bar;
}

export function getPlate(id: PlateId): PlateDefinition {
  const plate = plates.find(candidate => candidate.id === id);
  if (!plate) {
    throw new Error(`Unknown plate setting: ${id}`);
  }
  return plate;
}

export function getWeightPercentages(
  configuration: ConversionConfiguration,
  percentages: number[],
): WeightPercentage[] {
  const value = parseValue(configuration.value);
  const fromUnit = configuration.unit === 'kg' ? WeightUnit.Kilogram : WeightUnit.Pound;
  const toUnit = fromUnit === WeightUnit.Kilogram ? WeightUnit.Pound : WeightUnit.Kilogram;
  return percentages.map(percentage => {
    const fromWeight = (value / 100) * percentage;
    const conversion = new WeightConverter(fromUnit, fromWeight).convertTo(toUnit);
    return {
      percentage,
      conversion: new WeightConversion(
        conversion.fromUnit,
        Math.round(conversion.fromWeight),
        conversion.toUnit,
        Math.round(conversion.toWeight),
      ),
    };
  });
}

export class PlateDistributor {
  private readonly weightings = new Map<number, number>();

  constructor(
    private readonly settings: WeightSettings,
    private readonly unit: WeightUnit,
  ) {
    plates.forEach(plate => {
      this.weightings.set(this.unit === WeightUnit.Kilogram ? plate.kg : plate.lb, plate.weighting);
    });
  }

  getPlateDistribution(weight: number): PlateDistribution {
    const available = this.getAvailablePlates();
    const distributions: PlateDistribution[] = [];
    let plateToRemove = this.calculateNextPlateToRemove(available, 0);
    while (plateToRemove !== -1) {
      distributions.push(
        this.distribute(
          weight,
          available.filter(plate => plate !== plateToRemove),
        ),
      );
      plateToRemove = this.calculateNextPlateToRemove(available, plateToRemove);
    }
    if (distributions.length === 0) {
      return this.distribute(weight, available);
    }
    return this.determineBestDistribution(distributions);
  }

  private calculateNextPlateToRemove(available: number[], plateToRemove: number): number {
    const uniquePlates = [...new Set(available)];
    for (let index = uniquePlates.indexOf(plateToRemove); index < uniquePlates.length; index += 1) {
      const candidate = uniquePlates[index];
      if (candidate !== plateToRemove) {
        return candidate;
      }
    }
    return -1;
  }

  private distribute(weight: number, available: number[]): PlateDistribution {
    const distributed: number[] = [];
    let remaining = (weight - this.getBarWeight()) / 2;
    for (const plate of [...available]) {
      if (remaining >= plate) {
        distributed.push(plate, plate);
        remaining -= plate;
      }
    }
    return new PlateDistribution(distributed, this.unit, remaining <= 0);
  }

  private getAvailablePlates(): number[] {
    const available: number[] = [];
    this.settings.availablePlates.forEach(item => {
      const definition = getPlate(item.plateId);
      for (let index = 0; index < item.availability / 2; index += 1) {
        available.push(this.unit === WeightUnit.Kilogram ? definition.kg : definition.lb);
      }
    });
    return available.sort((left, right) => right - left);
  }

  private getBarWeight(): number {
    const bar = getBar(this.settings);
    return this.unit === WeightUnit.Kilogram ? bar.kg : bar.lb;
  }

  private determineBestDistribution(distributions: PlateDistribution[]): PlateDistribution {
    const complete = distributions.filter(distribution => distribution.completelyDistributed);
    if (complete.length > 0) {
      return complete.sort((left, right) => {
        const weightingDifference =
          this.sum(right.plates.map(plate => this.weightings.get(plate) ?? 0)) -
          this.sum(left.plates.map(plate => this.weightings.get(plate) ?? 0));
        return weightingDifference || left.plates.length - right.plates.length;
      })[0];
    }
    return distributions.sort((left, right) => {
      const weightDifference = this.sum(right.plates) - this.sum(left.plates);
      return weightDifference || left.plates.length - right.plates.length;
    })[0];
  }

  private sum(values: number[]): number {
    return values.reduce((sum, value) => sum + value, 0);
  }
}
