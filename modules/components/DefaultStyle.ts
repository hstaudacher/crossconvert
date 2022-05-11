import {Appearance} from 'react-native';

class DefaultStyle {
  public barColor: string | undefined;

  public barTitleColor: string | undefined;

  public barButtonColor: string | undefined;

  public weightListItemColor: string | undefined;

  public weightPercentageAddColor: string | undefined;

  public weightLegendTextColor: string | undefined;

  public weigthCantDistributeColor: string | undefined;

  public converionUnitSelectionColor: string | undefined;

  public plateDotsColor: string | undefined;

  public settingsTitleBackgroundColor: string | undefined;

  constructor() {
    this.applyColorScheme(Appearance.getColorScheme());
    Appearance.addChangeListener(preferences => {
      this.applyColorScheme(preferences.colorScheme);
    });
  }

  private applyColorScheme = (colorScheme: string | null | undefined) => {
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
  };
}

export default new DefaultStyle();
