import {Appearance} from 'react-native';

class DefaultStyle {
  public readonly barColor;

  public readonly barTitleColor;

  public readonly barButtonColor;

  public readonly weightListItemColor;

  public readonly weightPercentageAddColor;

  public readonly weightLegendTextColor;

  public readonly weigthCantDistributeColor;

  public readonly converionUnitSelectionColor;

  public readonly plateDotsColor;

  public readonly settingsTitleBackgroundColor;

  constructor() {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') {
      this.barColor = '#AE986B';
      this.barButtonColor = '#AE986B';
      this.barTitleColor = '#fff';
      this.weightListItemColor = '#AE986B';
      this.weightPercentageAddColor = '#AE986B';
      this.weightLegendTextColor = '#AE986B';
      this.weigthCantDistributeColor = '#AE986B';
      this.converionUnitSelectionColor = '#AE986B';
      this.plateDotsColor = '#AE986B';
      this.settingsTitleBackgroundColor = '#AE986B';
    } else {
      this.barColor = '#AE986B';
      this.barButtonColor = '#AE986B';
      this.barTitleColor = '#AE986B';
      this.weightListItemColor = '#AE986B';
      this.weightPercentageAddColor = '#AE986B';
      this.weightLegendTextColor = '#AE986B';
      this.weigthCantDistributeColor = '#AE986B';
      this.converionUnitSelectionColor = '#AE986B';
      this.plateDotsColor = '#AE986B';
      this.settingsTitleBackgroundColor = '#AE986B';
    }
  }
}

export default new DefaultStyle();
