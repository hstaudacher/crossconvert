import {Appearance} from 'react-native';

class DefaultStyle {
  public readonly baseColor;

  public readonly barColor;

  public readonly barButtonColor;

  public readonly weightListItemColor;

  public readonly weightPercentageAddColor;

  public readonly weightLegendTextColor;

  public readonly weigthCantDistributeColor;

  public readonly converionUnitSelectionColor;

  constructor() {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') {
      this.baseColor = '#fff';
      this.barColor = '#AE986B';
      this.barButtonColor = '#AE986B';
      this.weightListItemColor = '#AE986B';
      this.weightPercentageAddColor = '#AE986B';
      this.weightLegendTextColor = '#AE986B';
      this.weigthCantDistributeColor = '#AE986B';
      this.converionUnitSelectionColor = '#AE986B';
    } else {
      this.baseColor = '#AE986B';
      this.barColor = '#AE986B';
      this.barButtonColor = '#AE986B';
      this.weightListItemColor = '#AE986B';
      this.weightListItemColor = '#AE986B';
      this.weightLegendTextColor = '#AE986B';
      this.weigthCantDistributeColor = '#AE986B';
      this.converionUnitSelectionColor = '#AE986B';
    }
  }
}

export default new DefaultStyle();
