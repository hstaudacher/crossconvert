import {WeightUnit} from '../../conversion';
import {PlateMapping, plateMappings} from '../settings/Plates';
import {WeightSettings} from '../store/WeightSettingsStore';

class PlateGroup {
  constructor(readonly mapping: PlateMapping, readonly amount: number) {}
}

class PlateDistribution {
  constructor(readonly plates: number[], readonly unit: WeightUnit, readonly completelyDistributed = true) {}

  public getPlateGroups = (): PlateGroup[] => {
    const plateGroups: PlateGroup[] = [];
    plateMappings().forEach((mapping) => {
      const amount = this.plates.filter((p) => {
        const weight = this.unit === WeightUnit.kg ? mapping.kg : mapping.lb;
        return p === weight;
      }).length;
      if (amount > 0) {
        plateGroups.push(new PlateGroup(mapping, amount));
      }
    });
    if (this.unit === WeightUnit.kg) {
      return plateGroups.sort((g1, g2) => g2.mapping.kg - g1.mapping.kg);
    }
    return plateGroups.sort((g1, g2) => g2.mapping.lb - g1.mapping.lb);
  };
}

class PlateDistributor {
  private weightings = new Map<number, number>();

  constructor(readonly weightSettings: WeightSettings, readonly unit: WeightUnit) {
    plateMappings().forEach((m) => {
      if (this.unit === WeightUnit.kg) {
        this.weightings.set(m.kg, m.weighting);
      } else {
        this.weightings.set(m.lb, m.weighting);
      }
    });
  }

  public getPlateDistribution(weight: number): PlateDistribution {
    const distributions = [];
    const availablePlates = this.getAvailablePlates();
    let plateToRemove = this.calculateNextPlateToRemove(availablePlates, 0);
    while (plateToRemove !== -1) {
      const reducedPlates = availablePlates.filter((p) => p !== plateToRemove);
      distributions.push(this.distribute(weight, reducedPlates));
      plateToRemove = this.calculateNextPlateToRemove(availablePlates, plateToRemove);
    }

    return this.determineBestDistribution(distributions);
  }

  private calculateNextPlateToRemove(availablePlates: number[], plateToRemove: number) {
    const uniquePlates = [...new Set(availablePlates)];
    for (let index = uniquePlates.indexOf(plateToRemove); index < uniquePlates.length; index++) {
      const candidate = uniquePlates[index];
      if (candidate !== plateToRemove) {
        return candidate;
      }
    }
    return -1;
  }

  private distribute = (weight: number, availablePlates: number[]): PlateDistribution => {
    const plates: number[] = [];
    let weightToDistribute = (weight - this.getBarWeight()) / 2;
    let plate = availablePlates.shift();
    while (plate !== undefined && availablePlates.length >= 0 && weightToDistribute > 0) {
      if (weightToDistribute >= plate) {
        plates.push(plate);
        plates.push(plate);
        weightToDistribute = weightToDistribute - plate;
      }
      plate = availablePlates.shift();
    }
    if (weightToDistribute > 0) {
      return new PlateDistribution(plates, this.unit, false);
    }
    return new PlateDistribution(plates, this.unit);
  };

  private getAvailablePlates(): number[] {
    const plates: number[] = [];
    this.weightSettings.availablePlates.map((a) => {
      for (let i = 0; i < a.availability / 2; i++) {
        if (this.unit === WeightUnit.kg) {
          plates.push(a.mapping.kg);
        } else {
          plates.push(a.mapping.lb);
        }
      }
    });
    return plates.sort((a, b) => b - a);
  }

  private getBarWeight() {
    if (this.unit === WeightUnit.kg) {
      return this.weightSettings.bar.kg;
    }
    return this.weightSettings.bar.lb;
  }

  private determineBestDistribution(distributions: PlateDistribution[]) {
    const completeDistributions = distributions.filter((d) => d.completelyDistributed);
    if (completeDistributions.length > 0) {
      return this.sortDistributions(completeDistributions)[0];
    }
    return this.sortIncompleteDistributions(distributions)[0];
  }

  private sortIncompleteDistributions(distributions: PlateDistribution[]) {
    return distributions.sort((d1, d2) => {
      const sum1 = this.sum(d1.plates);
      const sum2 = this.sum(d2.plates);
      if (sum1 !== sum2) {
        return sum2 - sum1;
      }
      return d1.plates.length - d2.plates.length;
    });
  }

  private sortDistributions(distributions: PlateDistribution[]) {
    return distributions.sort((d1, d2) => {
      const weighting1 = this.sum(d1.plates.map((p) => this.weightings.get(p) || 0));
      const weighting2 = this.sum(d2.plates.map((p) => this.weightings.get(p) || 0));
      if (weighting1 !== weighting2) {
        return weighting2 - weighting1;
      }
      return d1.plates.length - d2.plates.length;
    });
  }

  private sum(weightings: number[]) {
    let sum = 0;
    weightings.forEach((w) => (sum += w));
    return sum;
  }
}

export {PlateDistributor, PlateDistribution, PlateGroup};
